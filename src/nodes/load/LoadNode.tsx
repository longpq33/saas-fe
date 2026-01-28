import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { LoadData } from './types';

const Wrapper = styled.div`
  min-width: 60px;
  padding: 8px 10px;
  background: #024A70;
  border: 1px solid #374151;
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

type LoadNodeProps = {
  data: LoadData;
};

export const LoadNode = ({ data }: LoadNodeProps) => {
  const p = data?.p_mw ?? 0;
  const q = data?.q_mvar ?? 0;

  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Load'}</Title>
      <Subtitle>
        {p} MW / {q} MVAr
      </Subtitle>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

