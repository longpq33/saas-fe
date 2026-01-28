import axios from 'axios';
import type { Edge, Node } from 'reactflow';

export type SimulateSettings = {
  algorithm?: string;
  max_iter?: number;
  tolerance_mva?: number;
  return_network?: 'none' | 'summary' | 'tables';
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

export type ValidationError = {
  element_id: string;
  element_type: string;
  element_name?: string;
  field?: string;
  message: string;
};

export type CreationStatus = {
  element_id: string;
  element_type: string;
  success: boolean;
  error?: string;
};

export type LoadResult = {
  p_mw: number;
  q_mvar: number;
};

export type GenResult = {
  p_mw: number;
  q_mvar: number;
  vm_pu: number;
};

export type SGenResult = {
  p_mw: number;
  q_mvar: number;
};

export type MotorResult = {
  p_mw: number;
  q_mvar: number;
};

export type ShuntResult = {
  p_mw: number;
  q_mvar: number;
};

export type StorageResult = {
  p_mw: number;
  q_mvar: number;
};

export type LineResult = {
  p_from_mw: number;
  q_from_mvar: number;
  p_to_mw: number;
  q_to_mvar: number;
  i_from_ka: number;
  i_to_ka: number;
  loading_percent: number;
};

export type TrafoResult = {
  p_hv_mw: number;
  q_hv_mvar: number;
  p_lv_mw: number;
  q_lv_mvar: number;
  i_hv_ka: number;
  i_lv_ka: number;
  loading_percent: number;
};

export type Trafo3WResult = {
  p_hv_mw: number;
  q_hv_mvar: number;
  p_mv_mw: number;
  q_mv_mvar: number;
  p_lv_mw: number;
  q_lv_mvar: number;
  i_hv_ka: number;
  i_mv_ka: number;
  i_lv_ka: number;
  loading_percent: number;
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
  errors: Record<string, ValidationError[]>;
  element_status: Record<string, CreationStatus>;
  results: {
    loads?: Record<string, LoadResult>;
    gens?: Record<string, GenResult>;
    sgens?: Record<string, SGenResult>;
    motors?: Record<string, MotorResult>;
    shunts?: Record<string, ShuntResult>;
    storages?: Record<string, StorageResult>;
    lines?: Record<string, LineResult>;
    trafos?: Record<string, TrafoResult>;
    trafo3ws?: Record<string, Trafo3WResult>;
  };
  network?: {
    meta: Record<string, unknown>;
    tables?: Record<string, Array<Record<string, unknown>>>;
    results?: Record<string, Array<Record<string, unknown>>>;
  } | null;
};

const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export async function simulate(payload: SimulateRequest): Promise<SimulateResponse> {
  const res = await axios.post<SimulateResponse>(`${apiBase}/api/v1/simulate`, payload, {
    timeout: 60_000,
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}

