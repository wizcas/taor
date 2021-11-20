import Modal from 'react-modal';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useContext } from 'react';
import CircleButton from './components/form/CircleButton';
import FeatherIcon from './components/icon/FeatherIcon';
import ContextProvider from './providers/ContextProvider';
import {
  CollectionsContext,
  COLLECTIONS_PROVIDER,
  WALLPAPER_PROVIDER,
} from './providers';
import CollectionBrowser from './pages/collection/CollectionBrowser';
import WallpaperSettings from './pages/wallpaper/WallpaperSettings';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';
import WallhavenWrapper from '@/pages/wallhaven/Wrapper';

import './App.css';

Modal.setAppElement('#root');

const CONTEXT_PROVIDERS = [WALLPAPER_PROVIDER, COLLECTIONS_PROVIDER];

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

  function openPageModal(path: string) {
    return () => open(path);
  }

  const c = useContext(CollectionsContext);

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <div className="fixed right-0 bottom-0 flex gap-4 items-center p-4">
        <CircleButton
          color="white"
          onClick={openPageModal('/wallpaper-settings')}
        >
          <FeatherIcon icon="feather" />
        </CircleButton>
        <CircleButton color="white" onClick={openPageModal('wallhaven')}>
          <FeatherIcon icon="settings" />
        </CircleButton>
        <CircleButton color="white" onClick={() => c.openBrowser()}>
          <FeatherIcon icon="image" />
        </CircleButton>
      </div>

      <PageModal title="wallhaven">
        <Switch>
          <Route path="/wallpaper-settings">
            <WallpaperSettings />
          </Route>
          <Route path="/wallhaven">
            <WallhavenWrapper />
          </Route>
        </Switch>
      </PageModal>

      <CollectionBrowser />
    </div>
  );
}
