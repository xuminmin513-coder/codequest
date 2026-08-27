import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializePlayerSaves } from './data/playerSaveRepository';
import './styles/design-tokens.css';

initializePlayerSaves();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
