import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { Trafo3WData } from './types';

const Wrapper = styled.div`
  min-width: 180px;
  padding: 10px 12px;
  background: #111827;
  border: 1px solid #6b7280;
  border-radius: 10px;
  color: #e5e7eb;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
`;

const Subtitle = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: #9ca3af;
`;

type Trafo3WNodeProps = {
  data: Trafo3WData;
};

export const Trafo3WNode = ({ data }: Trafo3WNodeProps) => {
  return (
    <Wrapper>
      {/* HV side - 2 target handles */}
      <Handle id="hv_t1" type="target" position={Position.Left} style={{ top: '20%', background: '#60a5fa', border: 0 }} />
      <Handle id="hv_t2" type="target" position={Position.Left} style={{ top: '35%', background: '#60a5fa', border: 0 }} />

      {/* MV side - 1 target + 1 source handle */}
      <Handle id="mv_t1" type="target" position={Position.Top} style={{ left: '50%', background: '#f59e0b', border: 0 }} />
      <Handle id="mv_s1" type="source" position={Position.Top} style={{ left: '65%', background: '#f59e0b', border: 0 }} />

      {/* LV side - 2 source handles */}
      <Handle id="lv_s1" type="source" position={Position.Right} style={{ top: '65%', background: '#34d399', border: 0 }} />
      <Handle id="lv_s2" type="source" position={Position.Right} style={{ top: '80%', background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Trafo3W'}</Title>
      <Subtitle>{data?.std_type || ''}</Subtitle>
    </Wrapper>
  );
};

