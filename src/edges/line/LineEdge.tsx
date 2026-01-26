import { BaseEdge, getBezierPath } from 'reactflow';
import type { EdgeProps } from 'reactflow';

import { LINE_COLOR } from './style';
import type { LineEdgeData } from './types';

type LineEdgeProps = EdgeProps<LineEdgeData>;

export const LineEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: LineEdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { std_type, length_km } = data || {};
  const label = `${std_type} (${length_km} km)`;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: LINE_COLOR,
          strokeWidth: 2,
        }}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{
            fontSize: 10,
            fill: '#9ca3af',
            userSelect: 'none',
          }}
          startOffset="50%"
          textAnchor="middle"
        >
          {label}
        </textPath>
      </text>
    </>
  );
};


