import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { AsymmetricSGenData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #10B981;
  border: 1px solid #34d399;
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

type AsymmetricSGenNodeProps = {
  data: AsymmetricSGenData;
};

export const AsymmetricSGenNode = ({ data }: AsymmetricSGenNodeProps) => {
  const p_a = data?.p_a_mw ?? 0;
  const p_b = data?.p_b_mw ?? 0;
  const p_c = data?.p_c_mw ?? 0;
  const total_p = p_a + p_b + p_c;

  return (
    <Wrapper>
      <Handle id="target" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Asymmetric SGen'}</Title>
      <Subtitle>
        A: {p_a}MW B: {p_b}MW C: {p_c}MW
      </Subtitle>
      <Subtitle>Total: {total_p.toFixed(2)} MW</Subtitle>
      <Handle id="source" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

