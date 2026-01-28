import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { TransformerData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #14b8a6;
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
  color: #222;
`;

type TransformerNodeProps = {
  data: TransformerData;
};

export const TransformerNode = ({ data }: TransformerNodeProps) => {
  return (
    <Wrapper>
      <Handle id="hv" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Transformer'}</Title>
      <Subtitle>{data?.std_type || ''}</Subtitle>
      <Handle id="lv" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

