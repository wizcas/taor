import Modal from 'react-modal';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';
import WallhavenWrapper from '@/pages/wallhaven/Wrapper';
import { CollectionsProvider } from '@/store/collections';
import { PreferencesProvider } from '@/store/preferences';

import './App.css';

Modal.setAppElement('#root');
export default function App() {
  return (
    <Router>
      <PreferencesProvider>
        <CollectionsProvider>
          <Home />
        </CollectionsProvider>
      </PreferencesProvider>
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
      <button type="button" className="bg-white" onClick={openPageModal}>
        wallhaven
      </button>

      <PageModal title="wallhaven">
        <Switch>
          <Route path="/wallhaven">
            <WallhavenWrapper />
          </Route>
        </Switch>
      </PageModal>
    </div>
  );
}
