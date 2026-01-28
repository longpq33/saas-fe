import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { SwitchData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #024A70;
  border: 1px solid #fbbf24;
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

type SwitchNodeProps = {
  data: SwitchData;
};

export const SwitchNode = ({ data }: SwitchNodeProps) => {
  const status = data?.closed ? 'CLOSED' : 'OPEN';
  const statusColor = data?.closed ? '#ef4444' : '#10b981';

  return (
    <Wrapper>
      <Handle id="bus" type="target" position={Position.Left} style={{ top: '50%', background: '#60a5fa', border: 0 }} />
      <Handle id="element" type="source" position={Position.Right} style={{ top: '50%', background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Switch'}</Title>
      <Subtitle style={{ color: statusColor }}>{status}</Subtitle>
    </Wrapper>
  );
};

