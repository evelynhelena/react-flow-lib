
import { FC } from 'react';
import { EdgeProps, getBezierPath, getEdgeCenter } from 'react-flow-renderer';
import { useContentReactFlow } from '../../hooks/useContentReactFlow';

import './styles.scss';

const foreignObjectSize = 40;

/* type CustomEdgeProps = GetBezierPathParams & GetCenterParams & React.SVGProps<SVGPathElement>; Merge de tipos */



export const ButtonEdge: FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) => {
    const { deleteEdgeButton } = useContentReactFlow();
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <button className="edgebutton" onClick={() => deleteEdgeButton(id)}>
                    x
                </button>
            </foreignObject>
        </>
    );
}
