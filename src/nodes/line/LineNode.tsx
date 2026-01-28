import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { LineData } from './types';

const Wrapper = styled.div`
  min-width: 120px;
  padding: 8px 10px;
  background: #075F5A;
  border: 1px solid #60a5fa;
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

type LineNodeProps = {
  data: LineData;
};

export const LineNode = ({ data }: LineNodeProps) => {
  const swEnabled = Boolean(data?.switch?.enabled);
  const swClosed = Boolean(data?.switch?.closed);
  const swStatus = swEnabled ? (swClosed ? 'SW:CLOSED' : 'SW:OPEN') : 'SW:DISABLED';

  return (
    <Wrapper>
      <Handle id="from" type="target" position={Position.Left} style={{ top: '35%', background: '#60a5fa', border: 0 }} />
      <Handle id="to" type="source" position={Position.Right} style={{ top: '35%', background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Line'}</Title>
      <Subtitle>
        {data?.fromBusId || 'from?'} → {data?.toBusId || 'to?'}
      </Subtitle>
      <Subtitle style={{ color: swEnabled ? (swClosed ? '#10b981' : '#ef4444') : '#9ca3af' }}>{swStatus}</Subtitle>
    </Wrapper>
  );
};

