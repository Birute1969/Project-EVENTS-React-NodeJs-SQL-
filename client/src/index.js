import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextWrapper } from './contexts/UserContextWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextWrapper>
        <App />
      </UserContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);