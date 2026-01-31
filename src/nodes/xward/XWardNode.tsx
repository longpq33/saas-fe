import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { XWardData } from './types';

const Wrapper = styled.div`
  min-width: 80px;
  padding: 8px 10px;
  background: #4B5563;
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
  color: #9ca3af;
`;

type XWardNodeProps = {
  data: XWardData;
};

export const XWardNode = ({ data }: XWardNodeProps) => {
  const ps = data?.ps_mw ?? 0;
  const qs = data?.qs_mvar ?? 0;
  const vm = data?.vm_pu ?? 1.0;

  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Extended Ward'}</Title>
      <Subtitle>
        P={ps} MW, Q={qs} MVAr
      </Subtitle>
      <Subtitle>vm={vm.toFixed(2)} pu</Subtitle>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

