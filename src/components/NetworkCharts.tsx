/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Empty } from 'antd';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { SimulateResponse } from '../api/simulate';

type NetworkChartsProps = {
  response: SimulateResponse;
  topN?: number;
};

type Row = Record<string, unknown>;

type BusMeta = {
  name?: string;
  min_vm_pu?: number;
  max_vm_pu?: number;
};

function asNumber(v: unknown): number | undefined {
  if (v === null || v === undefined) return undefined;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function asString(v: unknown): string | undefined {
  if (v === null || v === undefined) return undefined;
  const s = String(v);
  return s.length ? s : undefined;
}

function sum(values: Array<number | undefined>): number {
  return values.reduce((acc: number, v) => acc + (v ?? 0), 0);
}

export const NetworkCharts = ({ response, topN = 30 }: NetworkChartsProps) => {
  const network = response.network;

  const meta = network?.meta ?? {};
  const converged = Boolean((meta as Record<string, unknown>)?.converged ?? response.summary.converged);

  const busTable = ((network?.tables?.bus ?? []) as Row[]) || [];
  const lineTable = ((network?.tables?.line ?? []) as Row[]) || [];
  const trafoTable = ((network?.tables?.trafo ?? []) as Row[]) || [];

  const busMetaByIndex = new Map<string, BusMeta>();
  for (const r of busTable) {
    const idx = asString((r as any)?.index ?? (r as any)?.id);
    if (!idx) continue;
    busMetaByIndex.set(idx, {
      name: asString((r as any)?.name),
      min_vm_pu: asNumber((r as any)?.min_vm_pu),
      max_vm_pu: asNumber((r as any)?.max_vm_pu),
    });
  }

  const nameByLineIndex = new Map<string, string>();
  for (const r of lineTable) {
    const idx = asString((r as any)?.index ?? (r as any)?.id);
    const name = asString((r as any)?.name);
    if (idx && name) nameByLineIndex.set(idx, name);
  }

  const nameByTrafoIndex = new Map<string, string>();
  for (const r of trafoTable) {
    const idx = asString((r as any)?.index ?? (r as any)?.id);
    const name = asString((r as any)?.name);
    if (idx && name) nameByTrafoIndex.set(idx, name);
  }

  const resBus = ((network?.results?.res_bus ?? response.res_bus ?? []) as Row[]) || [];
  const resLine = ((network?.results?.res_line ?? []) as Row[]) || [];
  const resTrafo = ((network?.results?.res_trafo ?? []) as Row[]) || [];

  const voltageBars = resBus
    .map((r) => {
      const idx = asString((r as any)?.index ?? (r as any)?.id);
      const name = asString((r as any)?.name) ?? (idx ? busMetaByIndex.get(idx)?.name : undefined) ?? idx;
      const vm_pu = asNumber((r as any)?.vm_pu);
      const thresholds = idx ? busMetaByIndex.get(idx) : undefined;
      const min_vm_pu = thresholds?.min_vm_pu ?? 0.95;
      const max_vm_pu = thresholds?.max_vm_pu ?? 1.05;
      const outOfRange = vm_pu !== undefined && (vm_pu < min_vm_pu || vm_pu > max_vm_pu);
      return { name: name ?? '', vm_pu, min_vm_pu, max_vm_pu, outOfRange };
    })
    .filter((x) => x.name && x.vm_pu !== undefined);

  const vmValues = voltageBars.map((b) => b.vm_pu);
  const vmMin = vmValues.length ? Math.min(...(vmValues as number[])) : undefined;
  const vmMax = vmValues.length ? Math.max(...(vmValues as number[])) : undefined;
  const vmOutCount = voltageBars.filter((b) => b.outOfRange).length;

  const lineLoadingBars = resLine
    .map((r) => {
      const idx = asString((r as any)?.index ?? (r as any)?.id);
      const name = asString((r as any)?.name) ?? (idx ? nameByLineIndex.get(idx) : undefined) ?? idx;
      const loading = asNumber((r as any)?.loading_percent);
      return { name: name ?? '', loading };
    })
    .filter((x) => x.name && x.loading !== undefined)
    .sort((a, b) => (b.loading ?? 0) - (a.loading ?? 0))
    .slice(0, topN);

  const lineLoadValues = lineLoadingBars.map((b) => b.loading);
  const lineMax = lineLoadValues.length ? Math.max(...(lineLoadValues as number[])) : undefined;
  const lineOver80 = lineLoadingBars.filter((b) => (b.loading ?? 0) >= 80).length;
  const lineOver100 = lineLoadingBars.filter((b) => (b.loading ?? 0) >= 100).length;

  const trafoLoadingBars = resTrafo
    .map((r) => {
      const idx = asString((r as any)?.index ?? (r as any)?.id);
      const name = asString((r as any)?.name) ?? (idx ? nameByTrafoIndex.get(idx) : undefined) ?? idx;
      const loading = asNumber((r as any)?.loading_percent);
      return { name: name ?? '', loading };
    })
    .filter((x) => x.name && x.loading !== undefined)
    .sort((a, b) => (b.loading ?? 0) - (a.loading ?? 0))
    .slice(0, topN);

  const trafoLoadValues = trafoLoadingBars.map((b) => b.loading);
  const trafoMax = trafoLoadValues.length ? Math.max(...(trafoLoadValues as number[])) : undefined;
  const trafoOver80 = trafoLoadingBars.filter((b) => (b.loading ?? 0) >= 80).length;
  const trafoOver100 = trafoLoadingBars.filter((b) => (b.loading ?? 0) >= 100).length;

  const totalLoadMw = sum(Object.values(response.results?.loads ?? {}).map((x) => asNumber((x as any)?.p_mw)));
  const totalGenMw = sum(Object.values(response.results?.gens ?? {}).map((x) => asNumber((x as any)?.p_mw))) +
    sum(Object.values(response.results?.sgens ?? {}).map((x) => asNumber((x as any)?.p_mw)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {!converged && (
        <Card size="small" bodyStyle={{ padding: 8 }}>
          Not converged — values may be incomplete.
        </Card>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 12,
          alignItems: 'start',
        }}
      >
        <Card
          size="small"
          title="Voltage profile (vm_pu)"
          bodyStyle={{ padding: 8 }}
          extra={<span style={{ color: '#666' }}>out-of-range: {vmOutCount}</span>}
        >
          <div style={{ color: '#666', marginBottom: 8 }}>
            min={vmMin ?? ''} max={vmMax ?? ''}
          </div>
          {voltageBars.length === 0 ? (
            <Empty description="No voltage data" />
          ) : (
            <ReactECharts
              option={((): EChartsOption => {
                const labels = voltageBars.map((b) => b.name);
                return {
                  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                  grid: { left: 40, right: 16, top: 20, bottom: 80 },
                  xAxis: {
                    type: 'category',
                    data: labels,
                    axisLabel: { rotate: 35, interval: 0 },
                  },
                  yAxis: {
                    type: 'value',
                    name: 'pu',
                  },
                  series: [
                    {
                      type: 'bar',
                      data: voltageBars.map((b) => ({
                        value: b.vm_pu,
                        itemStyle: { color: b.outOfRange ? '#ff4d4f' : '#52c41a' },
                      })),
                      barMaxWidth: 28,
                    },
                  ],
                };
              })()}
              style={{ height: 320, width: '100%' }}
              notMerge
              lazyUpdate
            />
          )}
        </Card>

        <Card
          size="small"
          title={`Line loading (%) (Top ${topN})`}
          bodyStyle={{ padding: 8 }}
          extra={<span style={{ color: '#666' }}>{`>80%: ${lineOver80} | >100%: ${lineOver100}`}</span>}
        >
          <div style={{ color: '#666', marginBottom: 8 }}>max={lineMax ?? ''}</div>
          {lineLoadingBars.length === 0 ? (
            <Empty description="No line loading data" />
          ) : (
            <ReactECharts
              option={((): EChartsOption => {
                const labels = lineLoadingBars.map((b) => b.name);
                return {
                  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                  grid: { left: 50, right: 16, top: 20, bottom: 80 },
                  xAxis: {
                    type: 'category',
                    data: labels,
                    axisLabel: { rotate: 35, interval: 0 },
                  },
                  yAxis: { type: 'value', name: '%' },
                  series: [
                    {
                      type: 'bar',
                      data: lineLoadingBars.map((b) => {
                        const v = b.loading as number;
                        const color = v >= 100 ? '#ff4d4f' : v >= 80 ? '#faad14' : '#52c41a';
                        return { value: v, itemStyle: { color } };
                      }),
                      barMaxWidth: 28,
                    },
                  ],
                };
              })()}
              style={{ height: 320, width: '100%' }}
              notMerge
              lazyUpdate
            />
          )}
        </Card>

        <Card
          size="small"
          title={`Trafo loading (%) (Top ${topN})`}
          bodyStyle={{ padding: 8 }}
          extra={<span style={{ color: '#666' }}>{`>80%: ${trafoOver80} | >100%: ${trafoOver100}`}</span>}
        >
          <div style={{ color: '#666', marginBottom: 8 }}>max={trafoMax ?? ''}</div>
          {trafoLoadingBars.length === 0 ? (
            <Empty description="No trafo loading data" />
          ) : (
            <ReactECharts
              option={((): EChartsOption => {
                const labels = trafoLoadingBars.map((b) => b.name);
                return {
                  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                  grid: { left: 50, right: 16, top: 20, bottom: 80 },
                  xAxis: {
                    type: 'category',
                    data: labels,
                    axisLabel: { rotate: 35, interval: 0 },
                  },
                  yAxis: { type: 'value', name: '%' },
                  series: [
                    {
                      type: 'bar',
                      data: trafoLoadingBars.map((b) => {
                        const v = b.loading as number;
                        const color = v >= 100 ? '#ff4d4f' : v >= 80 ? '#faad14' : '#52c41a';
                        return { value: v, itemStyle: { color } };
                      }),
                      barMaxWidth: 28,
                    },
                  ],
                };
              })()}
              style={{ height: 320, width: '100%' }}
              notMerge
              lazyUpdate
            />
          )}
        </Card>

        <Card size="small" title="Generation vs Load (MW)" bodyStyle={{ padding: 8 }}>
          <div style={{ color: '#666', marginBottom: 8 }}>
            total_load_mw={totalLoadMw} total_gen_mw={totalGenMw}
          </div>
          <ReactECharts
            option={((): EChartsOption => {
              return {
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: 50, right: 16, top: 20, bottom: 40 },
                xAxis: {
                  type: 'category',
                  data: ['Load', 'Generation'],
                },
                yAxis: { type: 'value', name: 'MW' },
                series: [
                  {
                    type: 'bar',
                    data: [
                      { value: totalLoadMw, itemStyle: { color: '#ff4d4f' } },
                      { value: totalGenMw, itemStyle: { color: '#52c41a' } },
                    ],
                    barMaxWidth: 48,
                  },
                ],
              };
            })()}
            style={{ height: 240, width: '100%' }}
            notMerge
            lazyUpdate
          />
        </Card>
      </div>
    </div>
  );
};

