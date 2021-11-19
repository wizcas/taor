import Modal from 'react-modal';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CircleButton from './components/form/CircleButton';
import FeatherIcon from './components/icon/FeatherIcon';
import ContextProvider from './providers/ContextProvider';
import { COLLECTIONS_PROVIDER, PREFERENCES_PROVIDER } from './providers';
import CollectionBrowser from './pages/collection/CollectionBrowser';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';
import WallhavenWrapper from '@/pages/wallhaven/Wrapper';

import './App.css';

Modal.setAppElement('#root');

const CONTEXT_PROVIDERS = [PREFERENCES_PROVIDER, COLLECTIONS_PROVIDER];

export default function App() {
  return (
    <Router>
      <ContextProvider providers={CONTEXT_PROVIDERS}>
        <Home />
      </ContextProvider>
    </Router>
  );
}

function Home() {
  const { open } = usePageModal();

  function openPageModal() {
    open('/wallhaven');
  }

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <div className="fixed right-0 bottom-0 flex gap-4 items-center p-4">
        <CircleButton color="white" onClick={openPageModal}>
          <FeatherIcon icon="settings" />
        </CircleButton>
      </div>

      <PageModal title="wallhaven">
        <Switch>
          <Route path="/wallhaven">
            <WallhavenWrapper />
          </Route>
        </Switch>
      </PageModal>

      <CollectionBrowser />
    </div>
  );
}
