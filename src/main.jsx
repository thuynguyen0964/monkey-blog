import React from 'react';
import './index.scss';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { theme } from './utils/constant';
import { BrowserRouter } from 'react-router-dom';
import { GlobalCSS } from './styles/GlobalCSS.js';
import { ThemeProvider } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalCSS />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
