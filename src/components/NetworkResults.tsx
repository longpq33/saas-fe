/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Empty, Segmented, Table, Tabs, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';

import type { SimulateResponse } from '../api/simulate';

type NetworkResultsProps = {
  response: SimulateResponse;
};

type Row = Record<string, unknown>;

function buildColumns(rows: Row[]): ColumnsType<Row> {
  const keys = new Set<string>();
  for (const r of rows) {
    Object.keys(r || {}).forEach((k) => keys.add(k));
  }

  return Array.from(keys).map((k) => ({
    title: k,
    dataIndex: k,
    key: k,
    ellipsis: true,
    render: (v: unknown) => {
      if (v === null || v === undefined) return '';
      if (typeof v === 'number') return Number.isFinite(v) ? v : '';
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    },
  }));
}

export const NetworkResults = ({ response }: NetworkResultsProps) => {
  const network = response.network;

  const [activeTab, setActiveTab] = useState<'tables' | 'results'>('tables');

  const tableNames = useMemo(() => {
    const tables = network?.tables ?? {};
    return Object.keys(tables).sort((a, b) => a.localeCompare(b));
  }, [network?.tables]);

  const resultTableNames = useMemo(() => {
    const tables = network?.results ?? {};
    return Object.keys(tables).sort((a, b) => a.localeCompare(b));
  }, [network?.results]);

  const [selectedTable, setSelectedTable] = useState<string | undefined>(undefined);
  const [selectedResultTable, setSelectedResultTable] = useState<string | undefined>(undefined);

  const currentRows = useMemo(() => {
    const name = selectedTable ?? tableNames[0];
    if (!name) return [];
    return (network?.tables?.[name] ?? []) as Row[];
  }, [network?.tables, selectedTable, tableNames]);

  const currentResultRows = useMemo(() => {
    const name = selectedResultTable ?? resultTableNames[0];
    if (!name) return [];
    return (network?.results?.[name] ?? []) as Row[];
  }, [network?.results, selectedResultTable, resultTableNames]);

  const columns = useMemo(() => buildColumns(currentRows), [currentRows]);
  const resultColumns = useMemo(() => buildColumns(currentResultRows), [currentResultRows]);

  if (!network) {
    return (
      <Card size="small" title="Network results" style={{ marginTop: 8 }}>
        <Empty description="No network details returned" />
      </Card>
    );
  }

  const meta = network.meta ?? {};
  const converged = Boolean((meta as Record<string, unknown>)?.converged);

  return (
    <Card
      size="small"
      title={
        <span>
          Network results{' '}
          <Tag color={converged ? 'green' : 'red'}>{converged ? 'Converged' : 'Not converged'}</Tag>
        </span>
      }
      style={{ marginTop: 8 }}
      bodyStyle={{ padding: 8 }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
        <Segmented
          value={activeTab}
          onChange={(v) => setActiveTab(v as 'tables' | 'results')}
          options={[
            { label: 'Elements', value: 'tables' },
            { label: 'Results', value: 'results' },
          ]}
        />
        <div style={{ color: '#666' }}>
          sn_mva={(meta as any)?.sn_mva ?? ''} f_hz={(meta as any)?.f_hz ?? ''}
        </div>
      </div>

      {activeTab === 'tables' ? (
        <>
          {tableNames.length === 0 ? (
            <Empty description="No element tables" />
          ) : (
            <>
              <Tabs
                size="small"
                activeKey={selectedTable ?? tableNames[0]}
                onChange={(k) => setSelectedTable(k)}
                items={tableNames.map((name) => ({
                  key: name,
                  label: name,
                  children: (
                    <Table<Row>
                      size="small"
                      bordered
                      rowKey={(r, idx) => String((r as any)?.id ?? (r as any)?.index ?? idx)}
                      columns={columns}
                      dataSource={currentRows}
                      scroll={{ x: true }}
                    />
                  ),
                }))}
              />
            </>
          )}
        </>
      ) : (
        <>
          {resultTableNames.length === 0 ? (
            <Empty description="No result tables" />
          ) : (
            <Tabs
              size="small"
              activeKey={selectedResultTable ?? resultTableNames[0]}
              onChange={(k) => setSelectedResultTable(k)}
              items={resultTableNames.map((name) => ({
                key: name,
                label: name,
                children: (
                  <Table<Row>
                    size="small"
                    bordered
                    rowKey={(r, idx) => String((r as any)?.id ?? (r as any)?.index ?? idx)}
                    columns={resultColumns}
                    dataSource={currentResultRows}
                    scroll={{ x: true }}
                  />
                ),
              }))}
            />
          )}
        </>
      )}
    </Card>
  );
};

