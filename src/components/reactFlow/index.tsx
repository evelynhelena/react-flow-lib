
import { useState, useCallback, useRef, useEffect, MouseEvent, ReactNode } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, addEdge, Connection, NodeChange, EdgeChange, Edge, Node, Position, NodeTypes } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import "./styles.scss";
import { Button, Container } from '@mui/material';
import { ModalComponent } from '../Modal';
//import ButtonEdge from '../ButtonEdge';
import { ContentNode } from '../ContentNode';



const rfStyle = {
  backgroundColor: "#ffff",
  border: "1px solid",
  borderColor: "#DBDBDB",
  width: '70px',
  height: '70px',
  borderRadius: "7px",
}

const connectionLineStyle = { stroke: '#2194FF' };

/* const edgeTypes: NodeTypes = {
  buttonedge: ButtonEdge,
} */

function ReactFlowComponent() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
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

  const validyXPosition = function (nodeLength: number, node: Node[]) {
    if (nodeLength === 0) {
      return 80;
    } else if (nodeLength % 2 === 0) {
      return 0;
    } else {
      return node[nodeLength - 1].position.y + 80;
    }
  }



  const onConnect = useCallback((params: Connection) => setEdges((eds) =>
    addEdge({ ...params, style: { stroke: '#2194FF' } }, eds)), []);

  const onElementClick = function () {
    setNodes(nodes.map((n: Node) => n.selected ?
      { ...n, style: { ...rfStyle, boxShadow: '0px 2px 9px rgba(0, 159, 215, 0.8)', borderColor: '#009FD7' } } :
      { ...n, style: { ...rfStyle } }));
  }



  const deleteNodeButton = function (id: string) {
    console.log(nodes)
    console.log(edges)
    /*  setNodes(nodes.filter((el) => el.id !== id)); */
  }

  const addNode = useCallback(() => {
    yPos.current += 0;
    xPos.current += 100;
    let id = String(Date.now());

    setNodes((node: Node[]) =>
      [
        ...node,
        {
          id: id,
          type: node.length > 0 ? '' : 'input',
          data: {
            label: (<ContentNode classIcon='ri-database-2-line' titleInfo='Integrator DB' id={id} deleteNodeButton={deleteNodeButton} />)
          },
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
      <Button onClick={() => deleteNodeButton("teste")}>Teste</Button>
      <ModalComponent title="Json" nodeContest={nodes} edgeContest={edges} />

      <Box sx={{ height: '800px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionLineStyle={connectionLineStyle}
          /* edgeTypes={edgeTypes} */
          className="touchdevice-flow"
          onConnect={onConnect}
          onNodeClick={onElementClick}
          fitView
        />
      </Box>

    </Container>
  )
}

export default ReactFlowComponent;