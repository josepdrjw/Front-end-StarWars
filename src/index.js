import React from 'react';
import ReactDOM from 'react-dom/client';
import DadosProvider from './Context/DadosProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DadosProvider>
    <App />
  </DadosProvider>,
);
