import React from 'react';
import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { themes } from './utils/constant.js';
import { BrowserRouter } from 'react-router-dom';
import { GlobalCSS } from './styles/GlobalCSS.js';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={themes}>
      <BrowserRouter>
        <GlobalCSS />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
