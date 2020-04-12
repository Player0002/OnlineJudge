import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { CookiesProvider } from 'react-cookie'
import {BrowserRouter as Router} from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
