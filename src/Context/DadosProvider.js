import React, { useState, useEffect } from 'react';
import DadosContext from './DadosContext';
import request from '../servicos/requisicao';

function DadosProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [buscado, setBuscado] = useState('');
  const [filtro, setFiltro] = useState('');

  const [valoresSelecionados, setValoresSelecionados] = useState({
    coluna: 'population',
    comparador: 'maior que',
    num: 0,
  });

  const handleInputBusca = ({ target }) => {
    setBuscado(target.value);
  };

  useEffect(() => {
    request().then((dadosRecebidos) => setDados(dadosRecebidos));
  }, []);

  useEffect(() => {
    const filtrada = dados.filter((elemento) => elemento.name.toUpperCase()
      .includes(buscado.toLocaleUpperCase()));

    setFiltro(filtrada);
  }, [buscado, dados]);

  // esculta evento e seta  estado valoresSelecionados
  const handleSeleciona = ({ target }) => {
    setValoresSelecionados({
      ...valoresSelecionados,
      [target.name]: target.value,
    });
  };

  const values = {
    dados,
    handleInputBusca,
    buscado,
    filtro,
    handleSeleciona,
    valoresSelecionados,
  };

  return (
    <DadosContext.Provider value={ values }>
      { children }
    </DadosContext.Provider>
  );
}

DadosProvider.propTypes = {}.isRequired;

export default DadosProvider;
