import './app.scss';
import 'remixicon/fonts/remixicon.css'
import { ContentReactFlowProvider } from './hooks/useContentReactFlow';
import { PersistentDrawerLeft } from './components/Drawer';
import { DrawerRightProvider } from './hooks/useDrawerRight';
import { ReactFlowProvider } from 'react-flow-renderer';

function App() {
  return (
    <ReactFlowProvider>
      <DrawerRightProvider>
        <ContentReactFlowProvider>
          <PersistentDrawerLeft />
        </ContentReactFlowProvider >
      </DrawerRightProvider>
    </ReactFlowProvider>
  );
}

export default App;
