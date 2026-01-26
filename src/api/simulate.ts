import axios from 'axios';
import type { Edge, Node } from 'reactflow';

export type SimulateSettings = {
  algorithm?: string;
  max_iter?: number;
  tolerance_mva?: number;
};

export type SimulateRequest = {
  nodes: Array<Pick<Node, 'id' | 'type' | 'data'>>;
  edges: Array<Pick<Edge, 'id' | 'source' | 'target' | 'data'>>;
  settings?: SimulateSettings;
};

export type BusResult = {
  vm_pu: number;
  va_degree: number;
  p_mw: number;
  q_mvar: number;
};

export type SimulateResponse = {
  summary: {
    converged: boolean;
    runtime_ms: number;
    slack_bus_id: string;
  };
  bus_by_id: Record<string, BusResult>;
  res_bus: Array<Record<string, unknown>>;
  warnings: string[];
};

const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export async function simulate(payload: SimulateRequest): Promise<SimulateResponse> {
  const res = await axios.post<SimulateResponse>(`${apiBase}/api/v1/simulate`, payload, {
    timeout: 60_000,
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

