
import { useState, useCallback, useRef } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, addEdge, Connection, NodeChange, EdgeChange, Edge, Node, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';



import "./styles.scss";
import { Button, Container } from '@mui/material';
import { ModalComponent } from '../Modal';



const rfStyle = {
  backgroundColor: "#000",
  color: "#fff",
  width: '50px',
  height: '50px'
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    sourcePosition: "right"  as Position,
    data: { label: '1' },
    position: { x: 0, y: 80 },
    style: rfStyle
  },
  {
    id: '2',
    //type: 'input',
    sourcePosition: "right"  as Position,
    targetPosition: "left"  as Position,
    data: { label: '2' },
    position: { x: 100, y: 160 },
    style: rfStyle
  },
];

function ReactFlowComponent() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const yPos = useRef(80);
  const xPos = useRef(0);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const addNode = useCallback(() => {
    yPos.current += 80;
    xPos.current += 100;
  
    setNodes((node:any) => {
      return [
        ...node,
        {
          id: Date.now(),
          data: { label: '5' },
          sourcePosition: "right" as Position,
          targetPosition: "left" as Position,
          position: { x: xPos.current, y: yPos.current },
          style: rfStyle,
        },
      ];
    });
  }, []);

  return (
    <Container sx={{ p: 5 }}>
      <Button onClick={addNode}>addNode</Button>
      <ModalComponent title="Json" nodeContest={nodes} edgeContest={edges} />

      <Box sx={{ height: '800px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </Box>

    </Container>
  )
}

export default ReactFlowComponent;