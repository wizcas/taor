import { useContext } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { PageModal } from './components/common/modals/PageModal';
import { SearchBox } from './components/searchbox/SearchBox';
import { Wallpaper } from './components/wallpaper/Wallpaper';
import { WallhavenWrapper } from './pages/wallhaven';
import { PreferencesWrapper } from './context/preferences';

import './App.css';
import { PageModalContext, PageModalWrapper } from './context/pageModal';

Modal.setAppElement('#root');

export default function App() {
  return (
    <PreferencesWrapper>
      <PageModalWrapper>
        <Home />
      </PageModalWrapper>
    </PreferencesWrapper>
  );
}

const Home = observer(function () {
  const pageModal = useContext(PageModalContext);

  function openPageModal() {
    pageModal.open('/wallhaven');
  }

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <SearchBox className="" />
      <button onClick={openPageModal}>wallhaven</button>

      <PageModal title="wallhaven">
        <WallhavenWrapper />
      </PageModal>
    </div>
  );
});
