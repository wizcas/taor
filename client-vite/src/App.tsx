import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CircleIconButton from './components/form/CircleIconButton';
import MaskToggleGroup from './components/form/MaskToggleGroup';

function App() {
  const [count, setCount] = useState(0);

  function onChange(v: string) {
    console.log(v);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="italic">Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        <CircleIconButton size="80px" className="aspect-1">
          Hi
        </CircleIconButton>
        <MaskToggleGroup
          options={[
            { label: 'A', key: 'a' },
            { label: 'B', key: 'b' },
          ]}
          values="1 0"
          onChange={onChange}
        />
      </header>
    </div>
  );
}

export default App;
