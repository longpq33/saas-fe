import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { DcLoadData } from './types';
import { Head, NodeContent } from '../asymmetric_load/AsymmetricLoadNode';

const Wrapper = styled.div`
  min-width: 60px;
  background: #1E4A6B;
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

type DcLoadNodeProps = {
  data: DcLoadData;
};

export const DcLoadNode = ({ data }: DcLoadNodeProps) => {
  const p = data?.p_mw ?? 0;

  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Head>Load DC</Head>
      <NodeContent>
        <Title>{data?.name || 'Load DC'}</Title>
        <Subtitle>{p} MW</Subtitle>
      </NodeContent>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

