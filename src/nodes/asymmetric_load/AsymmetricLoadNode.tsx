import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { AsymmetricLoadData } from './types';

const Wrapper = styled.div`
  min-width: 80px;
  background: #6B46C1;
  border: 1px solid #a78bfa;
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

export const NodeContent = styled.div`
  padding: 8px 10px;
`;

export const Head = styled.div`
  border-bottom: 1px solid #fff;
  padding: 4px 10px;
  font-weight: bold;
`

type AsymmetricLoadNodeProps = {
  data: AsymmetricLoadData;
};

export const AsymmetricLoadNode = ({ data }: AsymmetricLoadNodeProps) => {
  const p_a = data?.p_a_mw ?? 0;
  const p_b = data?.p_b_mw ?? 0;
  const p_c = data?.p_c_mw ?? 0;
  const total_p = p_a + p_b + p_c;

  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Head>Asymmetric Load</Head>
      <NodeContent>
        <Title>{data?.name || 'Asymmetric Load'}</Title>
        <Subtitle>
          A: {p_a}MW B: {p_b}MW C: {p_c}MW
        </Subtitle>
        <Subtitle>Total: {total_p.toFixed(2)} MW</Subtitle>
      </NodeContent>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

