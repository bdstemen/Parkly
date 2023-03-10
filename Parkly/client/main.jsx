import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import '../styles.css';
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
