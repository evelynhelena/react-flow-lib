import './app.scss';
import 'remixicon/fonts/remixicon.css'
import { ContentReactFlowProvider } from './hooks/useContentReactFlow';
import { PersistentDrawerLeft } from './components/Drawer';
import { DrawerRightProvider } from './hooks/useDrawerRight';

function App() {
  return (
    <DrawerRightProvider>
      <ContentReactFlowProvider>
        <PersistentDrawerLeft />
      </ContentReactFlowProvider >
    </DrawerRightProvider>
  );
}

export default App;
