
import { getBezierPath, getEdgeCenter, Position } from 'react-flow-renderer';

import './styles.scss';

const foreignObjectSize = 40;

type CustomEdgeProps = {
    id: string;
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    style?: object;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    markerEnd?: string
}

const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: String) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};

export default function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: CustomEdgeProps) {
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
                <body>
                    <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
                        x
                    </button>
                </body>
            </foreignObject>
        </>
    );
}
