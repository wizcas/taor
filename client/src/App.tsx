import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import CircleButton from './components/button/CircleButton';
import FeatherIcon from './components/icon/FeatherIcon';
import ContextProvider from './providers/ContextProvider';
import {
  CollectionsContext,
  COLLECTIONS_PROVIDER,
  WALLPAPER_PROVIDER,
} from './providers';
import CollectionBrowser from './pages/collection/CollectionBrowser';
import CollectionEditor from './pages/collection/CollectionEditor';
import routes from './pages/routes';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';

import './App.css';

Modal.setAppElement('#root');

const CONTEXT_PROVIDERS = [WALLPAPER_PROVIDER, COLLECTIONS_PROVIDER];

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider providers={CONTEXT_PROVIDERS}>
        <Home />
      </ContextProvider>
    </BrowserRouter>
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
          <FeatherIcon icon="feather" size="lg" />
        </CircleButton>
        <CircleButton color="white" onClick={openPageModal('wallhaven')}>
          <FeatherIcon icon="settings" size="lg" />
        </CircleButton>
        <CircleButton color="white" onClick={() => c.openBrowser()}>
          <FeatherIcon icon="image" size="lg" />
        </CircleButton>
      </div>

      <PageModal routes={routes} />

      <CollectionBrowser />
      <CollectionEditor />
    </div>
  );
}
