// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// o strictmode estava deixando as leituras no firebase mal otimizadas e muito pesadas, retirei pra amenizar isso
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);