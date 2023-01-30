import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  AppContextProvider from './context/AppContext';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppContextProvider url={"https://www.balldontlie.io/api/v1/players"}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContextProvider>
);

