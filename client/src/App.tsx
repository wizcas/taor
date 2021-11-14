import Modal from 'react-modal';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import usePageModal from '@/hooks/usePageModal';
import Wallpaper from '@/components/image/Wallpaper';
import PageModal from '@/components/modals/PageModal';
import WallhavenWrapper from '@/pages/wallhaven/Wrapper';
import { PreferencesProvider } from '@/store/preferences';

import './App.css';
import CircleButton from './components/form/CircleButton';
import FeatherIcon from './components/icon/FeatherIcon';

Modal.setAppElement('#root');
export default function App() {
  return (
    <Router>
      <PreferencesProvider>
        <Home />
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
      <div className="fixed right-0 bottom-0 flex gap-4 items-center p-4">
        <CircleButton color="white" onClick={openPageModal}>
          <FeatherIcon icon="settings" size={32} />
        </CircleButton>
      </div>

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
