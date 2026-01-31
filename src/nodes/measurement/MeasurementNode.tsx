import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

import type { MeasurementData } from './types';

const Wrapper = styled.div`
  min-width: 100px;
  padding: 8px 10px;
  background: #FBBF24;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  color: #1f2937;
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
  color: #4b5563;
`;

type MeasurementNodeProps = {
  data: MeasurementData;
};

export const MeasurementNode = ({ data }: MeasurementNodeProps) => {
  const elementType = data?.element_type || 'bus';
  const measureType = data?.measurement_type || 'v';
  const element = data?.element || '?';

  return (
    <Wrapper>
      <Handle type="target" position={Position.Top} style={{ background: '#60a5fa', border: 0 }} />
      <Title>{data?.name || 'Measurement'}</Title>
      <Subtitle>
        {measureType.toUpperCase()} on {elementType}
      </Subtitle>
      <Subtitle>Element: {element}</Subtitle>
      <Handle type="source" position={Position.Bottom} style={{ background: '#34d399', border: 0 }} />
    </Wrapper>
  );
};

