import { useContext } from 'react';
import Modal from 'react-modal';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageModal } from './components/common/modals/PageModal';
import { SearchBox } from './components/searchbox/SearchBox';
import { Wallpaper } from './components/wallpaper/Wallpaper';
import { WallhavenWrapper } from './pages/wallhaven';
import { PreferencesWrapper } from './context/preferences';
import { PageModalContext, PageModalWrapper } from './context/pageModal';

import './App.css';

Modal.setAppElement('#root');

export default function App() {
  return (
    <Router>
      <PreferencesWrapper>
        <PageModalWrapper>
          <Home />
        </PageModalWrapper>
      </PreferencesWrapper>
    </Router>
  );
}

const Home = observer(function () {
  // const pageModal = useContext(PageModalContext);
  const history = useHistory();

  function openPageModal() {
    // pageModal.open('/wallhaven');
    history.push('/wallhaven');
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
