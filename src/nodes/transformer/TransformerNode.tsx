import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { TransformerData } from './types';

const Wrapper = styled.div`
  min-width: 170px;
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

type TransformerNodeProps = {
  data: TransformerData;
};

export const TransformerNode = ({ data }: TransformerNodeProps) => {
  return (
    <Wrapper>
      <Handle id="hv1" type="target" position={Position.Left} style={{ top: '20%', background: '#60a5fa', border: 0 }} />
      <Handle id="hv2" type="target" position={Position.Left} style={{ top: '50%', background: '#60a5fa', border: 0 }} />
      <Handle id="hv3" type="target" position={Position.Left} style={{ top: '80%', background: '#60a5fa', border: 0 }} />

      <Handle id="lv1" type="source" position={Position.Right} style={{ top: '20%', background: '#34d399', border: 0 }} />
      <Handle id="lv2" type="source" position={Position.Right} style={{ top: '50%', background: '#34d399', border: 0 }} />
      <Handle id="lv3" type="source" position={Position.Right} style={{ top: '80%', background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Transformer'}</Title>
      <Subtitle>{data?.std_type || ''}</Subtitle>
    </Wrapper>
  );
};

