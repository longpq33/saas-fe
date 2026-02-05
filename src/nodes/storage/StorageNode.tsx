import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { StorageData } from './types';
import { Head, NodeContent } from '../asymmetric_load/AsymmetricLoadNode';

const Wrapper = styled.div`
  min-width: 100px;
  background: #861043;
  border: 1px solid #14b8a6;
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

type StorageNodeProps = {
  data: StorageData;
};

export const StorageNode = ({ data }: StorageNodeProps) => {
  return (
    <Wrapper>
      <Handle id="target" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Head>Storage</Head>
      <NodeContent>
        <Title>{data?.name || 'Storage'}</Title>
        <Subtitle>
          P={data?.p_mw ?? 0} MW, SOC={data?.soc_percent ?? 0}%
        </Subtitle>
      </NodeContent>
      <Handle id="source" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

