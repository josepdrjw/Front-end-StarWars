import React, { useState, useEffect } from 'react';
import DadosContext from './DadosContext';
import request from '../servicos/requisicao';

function DadosProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [buscado, setBuscado] = useState('');
  const [filtro, setFiltro] = useState('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const [valoresSelecionados, setValoresSelecionados] = useState({
    coluna: 'population',
    comparador: 'maior que',
    num: 0,
  });

  const handleInputBusca = ({ target }) => {
    setBuscado(target.value);
  };

  // esculta evento e seta  estado valoresSelecionados
  const handleSeleciona = ({ target }) => {
    setValoresSelecionados({
      ...valoresSelecionados,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    request().then((dadosRecebidos) => setDados(dadosRecebidos));
  }, []);

  useEffect(() => {
    const filtrada = dados.filter((elemento) => elemento.name.toUpperCase()
      .includes(buscado.toLocaleUpperCase()));

    setFiltro(filtrada);
  }, [buscado, dados]);

  useEffect(() => {
    // desestruturando valoresSelecionados
    const { coluna, comparador, num } = opcaoSelecionada;

    let arrNovo = [];

    switch (comparador) {
    case 'maior que':
      arrNovo = dados.filter((elemento) => Number(elemento[coluna]) > Number(num));
      break;
    case 'menor que':
      arrNovo = dados.filter((elemento) => Number(elemento[coluna]) < Number(num));
      break;
    case 'igual a':
      arrNovo = dados.filter((elemento) => Number(elemento[coluna]) === Number(num));
      break;
    default:
      arrNovo = dados;
    }
    setFiltro(arrNovo);
  }, [opcaoSelecionada, dados]);

  const values = {
    dados,
    handleInputBusca,
    buscado,
    filtro,
    handleSeleciona,
    valoresSelecionados,
    opcaoSelecionada,
    setOpcaoSelecionada,
  };

  return (
    <DadosContext.Provider value={ values }>
      { children }
    </DadosContext.Provider>
  );
}

DadosProvider.propTypes = {}.isRequired;

export default DadosProvider;
