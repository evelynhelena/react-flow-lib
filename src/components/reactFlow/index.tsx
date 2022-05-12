
import ReactFlow, { EdgeTypes } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import "./styles.scss";
import { Container } from '@mui/material';
import { ButtonEdge } from '../ButtonEdge';
import { useContentReactFlow } from '../../hooks/useContentReactFlow';
import { Node } from 'react-flow-renderer';

const connectionLineStyle = { stroke: '#2194FF' };

const edgeTypes = { buttonedge: ButtonEdge } as unknown as EdgeTypes //TODO REsolver problema de Tipagem;

export function ReactFlowComponent() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onElementClick } = useContentReactFlow();


  return (
    <Container sx={{ p: 5, height: "100vh" }}>

      <Box sx={{ height: '100vh', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionLineStyle={connectionLineStyle}
          edgeTypes={edgeTypes}
          className="touchdevice-flow"
          onConnect={onConnect}
          onNodeClick={(event: React.MouseEvent, node: Node) => onElementClick(node.id)}

        >
        </ReactFlow>
      </Box>

    </Container>
  )
}
