import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { ImpedanceData } from './types';
import { Head, NodeContent } from '../asymmetric_load/AsymmetricLoadNode';

const Wrapper = styled.div`
  min-width: 120px;
  background: #F59E0B;
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

type ImpedanceNodeProps = {
  data: ImpedanceData;
};

export const ImpedanceNode = ({ data }: ImpedanceNodeProps) => {
  const r = data?.rft_pu ?? 0;
  const x = data?.xft_pu ?? 0;

  return (
    <Wrapper>
      <Handle id="from" type="target" position={Position.Left} style={{ top: '35%', background: '#60a5fa', border: 0 }} />
      <Handle id="to" type="source" position={Position.Right} style={{ top: '35%', background: '#34d399', border: 0 }} />
      <Head>Impedance</Head>
      <NodeContent>
        <Title>{data?.name || 'Impedance'}</Title>
        <Subtitle>
          {data?.fromBusId || 'from?'} → {data?.toBusId || 'to?'}
        </Subtitle>
        <Subtitle>
          R={r.toFixed(4)} pu, X={x.toFixed(4)} pu
        </Subtitle>
      </NodeContent>
    </Wrapper>
  );
};

