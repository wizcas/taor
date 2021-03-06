import Modal from 'react-modal';
import { MemoryRouter } from 'react-router-dom';
import CircleButton from './components/button/CircleButton';
import FeatherIcon from './components/icon/FeatherIcon';
import ContextProvider from './providers/ContextProvider';
import CollectionBrowser from './pages/collection/CollectionBrowser';
import CollectionEditor from './pages/collection/CollectionEditor';
import routes from './pages/routes';
import { COLLECTIONS_PROVIDER, WALLPAPER_PROVIDER } from './providers';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';

import './App.css';

Modal.setAppElement('#root');

const CONTEXT_PROVIDERS = [WALLPAPER_PROVIDER, COLLECTIONS_PROVIDER];

export default function App() {
  return (
    <MemoryRouter>
      <ContextProvider providers={CONTEXT_PROVIDERS}>
        <Home />
      </ContextProvider>
    </MemoryRouter>
  );
}

function Home() {
  const { open } = usePageModal();

  function openPageModal(path: string) {
    return () => open(path);
  }

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <div className="fixed right-0 bottom-0 flex gap-2 items-center p-4">
        <CircleButton
          color="white"
          onClick={openPageModal('/wallpaper')}
          className="bg-black-secondary bg-opacity-50"
        >
          <FeatherIcon icon="image" size="lg" />
        </CircleButton>
      </div>

      <PageModal routes={routes} />

      <CollectionBrowser />
      <CollectionEditor />
    </div>
  );
}
