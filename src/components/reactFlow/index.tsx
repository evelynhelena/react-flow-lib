
import { useState,useCallback , ReactNode} from 'react';
import ReactFlow,{applyEdgeChanges, applyNodeChanges} from 'react-flow-renderer';
import "./styles.scss";

const rfStyle = {
    backgroundColor: "#000", 
    color:"#fff", 
    width: '50px' ,
    height: '50px'
  };
  

type NodesProps = {
    id: string;
    type?: string;
    data: {label: string | ReactNode};
    position: {x: number, y: number};
    style?:object;
  }
type DefaultNodeProps = NodesProps[];

const initialNodes: DefaultNodeProps= [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    style: rfStyle
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];



 function ReactFlowComponent() {
  const [nodes, setNodes] = useState<NodesProps[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
      <div className="container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView 
        />;
      </div>
  )
}

export default ReactFlowComponent;