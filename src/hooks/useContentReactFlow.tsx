import { createContext, useState, ReactNode, useContext, useRef, useCallback, useEffect } from 'react';
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

export interface ItemMenu {
    id: string;
    component: string;
    description: string;
    operations: Array<string>;
    configs: Array<string>;
    icon: string;
    label?: JSX.Element;
}

interface ContentReactFlowData {
    nodes: Node[];
    edges: Edge[];
    nodeSelected: Node<ItemMenu> | undefined;
    addNode: (data: ItemMenu) => void;
    onElementClick: (id: string) => void;
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (params: Connection) => void;
    deleteNodeButton: (id: string) => void;
    deleteEdgeButton: (id: string) => void;
    updateNode: (component: string, description: string, id: string) => void;
    clearAll: () => void;

}


export const ContentReactFlowContext = createContext<ContentReactFlowData>({} as ContentReactFlowData);

export function ContentReactFlowProvider({ children }: ContentReactFlowProviderProps) {
    const [nodes, setNodes] = useState<Node<ItemMenu>[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [nodeSelected, setNodeSelected] = useState<Node<ItemMenu> | undefined>(undefined);
    const [idNodeSelected, setIdNodeSelected] = useState("");
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


    const onElementClick = function (id: string) {
        setNodes(nodes.map((n: Node) => n.selected ?
            { ...n, style: { ...rfStyle, boxShadow: '0px 2px 9px rgba(0, 159, 215, 0.8)', borderColor: '#009FD7' } } :
            { ...n, style: { ...rfStyle } }));
        let nodeFind = nodes.find(el => el.id === id);
        setNodeSelected(nodeFind);
        toggleDrawer(true);
    }


    const addNode = useCallback(({ component, description, operations, icon, id, configs }: ItemMenu) => {
        yPos.current += 0;
        xPos.current += 100;
        let idWhithTimestamp = id + Date.now();
        setNodes((node) =>
            [
                ...node,
                {
                    data: {
                        label: (<ContentNode classIcon={icon} titleInfo={component} id={idWhithTimestamp} />),
                        component,
                        icon,
                        configs,
                        description,
                        id: idWhithTimestamp,
                        operations
                    },
                    type: node.length > 0 ? '' : 'input',
                    id: idWhithTimestamp,
                    position: { x: xPos.current, y: validyXPosition(node.length, node) },
                    style: rfStyle,
                    sourcePosition: "right" as Position,
                    targetPosition: "left" as Position,
                }
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

    const updateNode = useCallback((component: string, description: string, id: string) => {

        //const { component, configs, description, operations, id };

        setNodes((oldState) => oldState.map((el) => el.id === id ?
            {
                ...el,
                data: {
                    ...el.data,
                    label: (<ContentNode classIcon={el.data.icon} titleInfo={component} id={id} />),
                    component,
                    description
                }
            }
            : el
        ))
        setIdNodeSelected(id);
    }, [])

    useEffect(() => {
        let nodeFind = nodes.find(el => el.id === idNodeSelected);
        setNodeSelected(nodeFind);
    }, [idNodeSelected])

    const clearAll = useCallback(() => {
        setNodes([]);
        setEdges([]);
    }, [])

    return (
        <ContentReactFlowContext.Provider
            value={
                {
                    nodes,
                    edges,
                    addNode,
                    onNodesChange,
                    onEdgesChange,
                    onConnect,
                    onElementClick,
                    deleteNodeButton,
                    deleteEdgeButton,
                    nodeSelected,
                    updateNode,
                    clearAll
                }
            }>
            {children}
        </ContentReactFlowContext.Provider>
    )
}

export function useContentReactFlow() {
    const context = useContext(ContentReactFlowContext);
    return context;
}