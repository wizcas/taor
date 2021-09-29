import { useRef } from 'react';
import Modal from 'react-modal';
import { FullScreenModal } from './components/common/modals/FullScreenModal';
import { SearchBox } from './components/searchbox/SearchBox';
import { Wallpaper } from './components/wallpaper/Wallpaper';
import { WallhavenWrapper } from './pages/wallhaven';

import './App.css';

Modal.setAppElement('#root');

function App() {
  const pageModalRef = useRef(null);

  function openPageModal() {
    pageModalRef.current?.open();
  }

  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <SearchBox className="" />
      <button onClick={openPageModal}>wallhaven</button>

      <FullScreenModal ref={pageModalRef} title="wallhaven">
        <WallhavenWrapper />
      </FullScreenModal>
    </div>
  );
}

export default App;
