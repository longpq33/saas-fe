import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { GenData } from './types';
import { Head, NodeContent } from '../asymmetric_load/AsymmetricLoadNode';

const Wrapper = styled.div`
  min-width: 100px;
  background: #BB4D1A;
  border: 1px solid #10b981;
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

type GenNodeProps = {
  data: GenData;
};

export const GenNode = ({ data }: GenNodeProps) => {
  return (
    <Wrapper>
      <Handle id="target" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Head>Gen</Head>
      <NodeContent>
        <Title>{data?.name || 'Gen'}</Title>
        <Subtitle>
          P={data?.p_mw ?? 0} MW, vm={data?.vm_pu ?? 1} pu
        </Subtitle>
      </NodeContent>
      <Handle id="source" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

