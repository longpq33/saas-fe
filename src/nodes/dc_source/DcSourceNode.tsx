import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { DcSourceData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #8B4513;
  border: 1px solid #ffa500;
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

type DcSourceNodeProps = {
  data: DcSourceData;
};

export const DcSourceNode = ({ data }: DcSourceNodeProps) => {
  return (
    <Wrapper>
      <Handle id="target" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Source DC'}</Title>
      <Subtitle>vm={data?.vm_pu ?? 1} pu</Subtitle>
      <Handle id="source" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

