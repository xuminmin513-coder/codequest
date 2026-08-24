import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializePlayerSaves } from './data/playerSaveRepository';

initializePlayerSaves();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
