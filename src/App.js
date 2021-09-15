import "./App.css";
import { SearchBox } from "./components/searchbox/SearchBox";
import { Wallpaper } from "./components/wallpaper/Wallpaper";

function App() {
  return (
    <div className="App flex justify-center items-center w-screen h-screen">
      <Wallpaper />
      <SearchBox className="" />
    </div>
  );
}

export default App;
