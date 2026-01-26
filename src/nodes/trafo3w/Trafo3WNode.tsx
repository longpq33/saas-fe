import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { Trafo3WData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #111827;
  border: 1px solid #6b7280;
  border-radius: 10px;
  color: #e5e7eb;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
`;

const Subtitle = styled.div`
  margin-top: 2px;
  font-size: 8px;
  color: #9ca3af;
`;

type Trafo3WNodeProps = {
  data: Trafo3WData;
};

export const Trafo3WNode = ({ data }: Trafo3WNodeProps) => {
  return (
    <Wrapper>
      <Handle id="hv_t1" type="target" position={Position.Left} style={{ background: '#60a5fa', border: 0 }} />
      <Handle id="mv_t1" type="target" position={Position.Top} style={{ background: '#f59e0b', border: 0 }} />
      <Handle id="lv_s1" type="source" position={Position.Right} style={{ background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Trafo3W'}</Title>
      <Subtitle>{data?.std_type || ''}</Subtitle>
    </Wrapper>
  );
};

