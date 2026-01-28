import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { MotorData } from './types';

const Wrapper = styled.div`
  min-width: 150px;
  padding: 8px 10px;
  background: #312C85;
  border: 1px solid #8b5cf6;
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

type MotorNodeProps = {
  data: MotorData;
};

export const MotorNode = ({ data }: MotorNodeProps) => {
  return (
    <Wrapper>
      <Handle id="target" type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Handle id="source" type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />

      <Title>{data?.name || 'Motor'}</Title>
      <Subtitle>
        P={data?.pn_mech_mw ?? 0} MW, η={data?.efficiency ?? 0}
      </Subtitle>
    </Wrapper>
  );
};

