import React, { useState, useEffect } from 'react';
import DadosContext from './DadosContext';
import request from '../servicos/requisicao';

function DadosProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [buscado, setBuscado] = useState('');
  // const [filtrado, setFiltrado] = useState('');

  const handleInputBusca = ({ target }) => {
    setBuscado(target.value);
  };

  useEffect(() => {
    request().then((dadosRecebidos) => setDados(dadosRecebidos));
  }, []);

  const values = {
    dados,
    handleInputBusca,
    buscado,
  };

  return (
    <DadosContext.Provider value={ values }>
      { children }
    </DadosContext.Provider>
  );
}

DadosProvider.propTypes = {}.isRequired;

export default DadosProvider;
