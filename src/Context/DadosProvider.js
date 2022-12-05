import React, { useState, useEffect } from 'react';
import DadosContext from './DadosContext';
import request from '../servicos/requisicao';
// import dadosRecebidos from '../servicos/requisicao';

function DadosProvider({ children }) {
  const [dados, setDados] = useState([]);
  const [buscado, setBuscado] = useState('');
  const [filtro, setFiltro] = useState([]);

  const [valoresSelecionados, setValoresSelecionados] = useState({
    coluna: 'population',
    comparador: 'maior que',
    num: 0,
  });

  useEffect(() => {
    request().then((dadosRecebidos) => setDados(dadosRecebidos));
  }, []);

  useEffect(() => {
    const resFiltro = dados.filter((elemento) => elemento.name.toUpperCase()
      .includes(buscado.toLocaleUpperCase()));

    setFiltro(resFiltro);
  }, [buscado, dados]);

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

  // desestrutura os objetos do stado valorSelecionado,
  // cria umar variavel tipo array vazio $arrNovo,
  // Recebe comparador como paramentro do switch que é o valor do select 'dropdown' e ultilizando a funçao switch
  // caso o comparador possua o valor 'maior que' >
  // arrNovo recebe o retorno do filter feito no stado dados, ex: se o rotation_periodo === 12 obs: funcão chamada no botao filtrar
  const ComparaPlanetas = () => {
    const { coluna, comparador, num } = valoresSelecionados;

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
    setDados(arrNovo);
  };

  const values = {
    dados,
    handleInputBusca,
    buscado,
    filtro,
    setFiltro,
    handleSeleciona,
    valoresSelecionados,
    ComparaPlanetas,
    // opcaoSelecionada,
    // setOpcaoSelecionada,
    // teste,
  };

  return (
    <DadosContext.Provider value={ values }>
      { children }
    </DadosContext.Provider>
  );
}

DadosProvider.propTypes = {}.isRequired;

export default DadosProvider;
