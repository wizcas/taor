import { useRef } from 'react';
import Modal from 'react-modal';
import { FullScreenModal } from './components/common/modals/FullScreenModal';
import { SearchBox } from './components/searchbox/SearchBox';
import { Wallpaper } from './components/wallpaper/Wallpaper';
import { WallhavenWrapper } from './pages/wallhaven';

import './App.css';
import { PreferencesWrapper } from './context/preferences';

Modal.setAppElement('#root');

function App() {
  const pageModalRef = useRef(null);

  function openPageModal() {
    pageModalRef.current?.open();
  }

  return (
    <PreferencesWrapper>
      <div className="App flex justify-center items-center w-screen h-screen">
        <Wallpaper />
        <SearchBox className="" />
        <button onClick={openPageModal}>wallhaven</button>

        <FullScreenModal ref={pageModalRef} title="wallhaven">
          <WallhavenWrapper />
        </FullScreenModal>
      </div>
    </PreferencesWrapper>
  );
}

export default App;
