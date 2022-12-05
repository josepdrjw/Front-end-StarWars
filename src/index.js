import React from 'react';
import ReactDOM from 'react-dom/client';
import DadosProvider from './Context/DadosProvider';
import App from './App';
// import Filtro from './componentes/Filtro';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DadosProvider>
    {/* <Filtro /> */}
    <App />
  </DadosProvider>,
);
