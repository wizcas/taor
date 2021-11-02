import Modal from 'react-modal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageModal } from './components/common/modals/PageModal';
import { SearchBox } from './components/searchbox/SearchBox';
import { Wallpaper } from './components/wallpaper/Wallpaper';
import { WallhavenWrapper } from './pages/wallhaven';
import { PreferencesWrapper } from './context/preferences';

import './App.css';
import { usePageModal } from './hooks/usePageModal';

Modal.setAppElement('#root');

export default function App() {
  return (
    <Router>
      <PreferencesWrapper>
        <Home />
      </PreferencesWrapper>
    </Router>
  );
}

const Home = observer(() => {
  const { open } = usePageModal();

  function openPageModal() {
    open('/wallhaven');
  }

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <SearchBox className="" />
      <button onClick={openPageModal}>wallhaven</button>

      <PageModal title="wallhaven">
        <Switch>
          <Route path="/wallhaven">
            <WallhavenWrapper />
          </Route>
        </Switch>
      </PageModal>
    </div>
  );
});
