import React, { useState, useEffect, useMemo } from 'react';
import DadosContext from './DadosContext';
import request from '../servicos/requisicao';

function DadosProvider({ children }) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    request().then((dadosRecebidos) => setDados(dadosRecebidos));
  }, []);

  const values = useMemo(
    () => ({
      dados,
    }),
    [dados],
  );

  return (
    <DadosContext.Provider value={ values }>
      { children }
    </DadosContext.Provider>
  );
}

DadosProvider.propTypes = {}.isRequired;

export default DadosProvider;
