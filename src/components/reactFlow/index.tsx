
import { useState, useCallback, useRef, useEffect, MouseEvent } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, addEdge, Connection, NodeChange, EdgeChange, Edge, Node, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import "./styles.scss";
import { Button, Container } from '@mui/material';
import { ModalComponent } from '../Modal';
import { ButtonEdge } from '../ButtonEdge';



const rfStyle = {
  backgroundColor: "#ffff",
  border: "1px solid #DBDBDB",
  color: "#fff",
  width: '60px',
  height: '60px',
  /* boxShadow: '0px 2px 20px rgba(0, 159, 215, 0.8)', */
  borderRadius: "7px",
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    sourcePosition: "right" as Position,
    data: { label: '1' },
    position: { x: 0, y: 80 },
    style: rfStyle
  },
];

const edgeTypes = {
  buttonedge: ButtonEdge,
}

function ReactFlowComponent() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const yPos = useRef(80);
  const xPos = useRef(0);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge({ ...params, type: '', sourceHandle: 'b' }, eds)), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const validyXPosition = function (nodeLength: number, node: Node[]) {
    if (nodeLength === 0) {
      return 80;
    } else if (nodeLength % 2 === 0) {
      return 0;
    } else {
      return node[nodeLength - 1].position.y + 80;
    }
  }

  const onElementClick = function (node: Node) {
    /*  setTasks(tasks.map((t) => t.id === id ? {...t,isComplete:!t.isComplete} : t)); */

    //setNodes(nodes.map((n) => n.id === node.id ? { ...n,  }))
    console.log(node);
  }

  const addNode = useCallback(() => {
    yPos.current += 0;
    xPos.current += 100;

    setNodes((node: Node[]) =>
      [
        ...node,
        {
          id: String(Date.now()),
          type: node.length > 0 ? '' : 'input',
          data: { label: node.length + 1 },
          sourcePosition: "right" as Position,
          targetPosition: "left" as Position,
          position: { x: xPos.current, y: validyXPosition(node.length, node) },
          style: rfStyle,
        },
      ]
    );
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
          /*     edgeTypes={{
                buttonedge: <Button onClick={onEdgeClick} />,
              }} */
          className="touchdevice-flow"
          onConnect={onConnect}
          onNodeClick={(event, node) => onElementClick(node)}
          fitView
        />
      </Box>

    </Container>
  )
}

export default ReactFlowComponent;