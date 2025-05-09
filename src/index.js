import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ZeldaProvider } from './contexts/zeldaContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ZeldaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ZeldaProvider>
  </React.StrictMode>
);
