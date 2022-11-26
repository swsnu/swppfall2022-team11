import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./store"
import Axios from "axios";
Axios.defaults.xsrfCookieName = 'csrftoken';
Axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
export type AppDispatch = typeof store.dispatch;