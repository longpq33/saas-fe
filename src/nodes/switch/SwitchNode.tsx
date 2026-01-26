import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { SwitchData } from './types';

const Wrapper = styled.div`
  min-width: 150px;
  padding: 10px 12px;
  background: #111827;
  border: 1px solid #fbbf24;
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

type SwitchNodeProps = {
  data: SwitchData;
};

export const SwitchNode = ({ data }: SwitchNodeProps) => {
  const status = data?.closed ? 'CLOSED' : 'OPEN';
  const statusColor = data?.closed ? '#10b981' : '#ef4444';

  return (
    <Wrapper>
      <Handle id="bus" type="target" position={Position.Left} style={{ top: '50%', background: '#60a5fa', border: 0 }} />
      <Handle id="element" type="source" position={Position.Right} style={{ top: '50%', background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Switch'}</Title>
      <Subtitle style={{ color: statusColor }}>{status}</Subtitle>
    </Wrapper>
  );
};

