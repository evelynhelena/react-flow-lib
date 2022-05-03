import { createContext, useState, ReactNode, useContext, useRef, useCallback } from 'react';
import { applyEdgeChanges, applyNodeChanges, addEdge, Connection, NodeChange, EdgeChange, Edge, Node, Position } from 'react-flow-renderer';
import { ContentNode } from '../components/ContentNode';
import { useDrawerRight } from './useDrawerRight';

const rfStyle = {
    backgroundColor: "#ffff",
    border: "1px solid",
    borderColor: "#DBDBDB",
    width: '70px',
    height: '70px',
    borderRadius: "7px",
}

interface ContentReactFlowProviderProps {
    children: ReactNode
}

interface ItemMenu {
    id: string;
    component: string;
    description: string;
    operations: Array<string>;
    configs: Array<string>;
    icon: string;
}
interface ContentReactFlowData {
    nodes: Node[];
    edges: Edge[];
    addNode: (data: ItemMenu) => void;
    onElementClick: () => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (params: Connection) => void;
    deleteNodeButton: (id: string) => void;
    deleteEdgeButton: (id: string) => void;

}

export const ContentReactFlowContext = createContext<ContentReactFlowData>({} as ContentReactFlowData);

export function ContentReactFlowProvider({ children }: ContentReactFlowProviderProps) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const { toggleDrawer } = useDrawerRight();
    const yPos = useRef(80);
    const xPos = useRef(0);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback((params: Connection) => setEdges((eds) =>
        addEdge({ ...params, type: 'buttonedge', style: { stroke: '#2194FF' } }, eds)), []);

    const validyXPosition = function (nodeLength: number, node: Node[]) {
        if (nodeLength === 0) {
            return 80;
        } else if (nodeLength % 2 === 0) {
            return 0;
        } else {
            return node[nodeLength - 1].position.y + 80;
        }
    }


    const onElementClick = function () {
        setNodes(nodes.map((n: Node) => n.selected ?
            { ...n, style: { ...rfStyle, boxShadow: '0px 2px 9px rgba(0, 159, 215, 0.8)', borderColor: '#009FD7' } } :
            { ...n, style: { ...rfStyle } }));
        toggleDrawer(true);
    }


    const addNode = useCallback((data: ItemMenu) => {
        yPos.current += 0;
        xPos.current += 100;
        setNodes((node: Node[]) =>
            [
                ...node,
                {
                    id: data.id,
                    type: node.length > 0 ? '' : 'input',
                    data: {
                        label: (<ContentNode classIcon={data.icon} titleInfo={data.component} id={data.id} />)
                    },
                    sourcePosition: "right" as Position,
                    targetPosition: "left" as Position,
                    position: { x: xPos.current, y: validyXPosition(node.length, node) },
                    style: rfStyle,
                },
            ]
        );
    }, []);


    const deleteNodeButton = useCallback((id: string) => {
        setNodes((oldState) => oldState.filter((el) => el.id !== id));
        setEdges((oldState) => oldState.filter((el) => el.source !== id && el.target !== id));
        toggleDrawer(false);
    }, [toggleDrawer])

    const deleteEdgeButton = useCallback((id: string) => {
        setEdges((oldState) => oldState.filter((el) => el.id !== id));
    }, [])

    return (
        <ContentReactFlowContext.Provider
            value={{ nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect, onElementClick, deleteNodeButton, deleteEdgeButton }}>
            {children}
        </ContentReactFlowContext.Provider>
    )
}

export function useContentReactFlow() {
    const context = useContext(ContentReactFlowContext);
    return context;
}