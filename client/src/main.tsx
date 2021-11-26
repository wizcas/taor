import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';
// Tippy.js styling
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/themes/light.css';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
