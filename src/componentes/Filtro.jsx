import React, { useContext, useState } from 'react';
import DadosContext from '../Context/DadosContext';
import './table.css';

function Filtro() {
  const opcColuna = [
    'orbital_period',
    'population',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const {
    comparaPlanetas,
    handleInputBusca,
    buscado,
    dadosIniciais,
    // setDados,
    setFiltro,
    handleSeleciona,
    valoresSelecionados,
    // setValoresSelecionados,
  } = useContext(DadosContext);

  const [paramsFiltrados, setParamsFiltrados] = useState([]);

  const clicFiltrarbtn = (() => {
    comparaPlanetas();
    setParamsFiltrados([...paramsFiltrados, valoresSelecionados]);
  });

  // console.log(paramsFiltrados);
  console.log(valoresSelecionados);

  const removeFiltros = (elemento) => {
    const filters = paramsFiltrados
      .filter((filtroSelecionado) => filtroSelecionado.coluna !== elemento.coluna);
    setParamsFiltrados([...filters]);
    let novosPlanetas = [...dadosIniciais];
    filters.forEach((e) => {
      novosPlanetas = novosPlanetas.filter((el) => {
        if (e.comparador === 'maior que') {
          return Number(el[e.coluna]) > Number(e.num);
        }
        if (e.comparador === 'menor que') {
          return Number(el[e.coluna]) < Number(e.num);
        }
        return Number(el[e.coluna]) === Number(e.num);
      });
    });
    setFiltro(novosPlanetas);
    console.log(novosPlanetas);
  };

  const removeTodosOsFiltros = () => {
    setParamsFiltrados([]);
    setFiltro(dadosIniciais);
  };

  const operador = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <div>
      <h1>Projeto Planetas</h1>
      <div>
        <input
          type="text"
          placeholder="Pesquisar"
          value={ buscado }
          data-testid="name-filter"
          name="name-filter"
          id="name-filter"
          onChange={ handleInputBusca }
        />
      </div>
      <div id="divFilros">
        <div id="colunaOptions">
          <label htmlFor="column-filter">
            Coluna
            <br />
            <select
              data-testid="column-filter"
              name="coluna"
              id="column-filter"
              value={ valoresSelecionados.coluna }
              onChange={ handleSeleciona }
            >
              {opcColuna
                .filter((e) => paramsFiltrados.every((opc) => e !== opc.coluna))
                .map((coluna, index) => (
                  <option key={ index }>{coluna}</option>
                ))}
            </select>
          </label>
        </div>
        <div id="opredaroOptions">
          <label htmlFor="comparison-filter">
            Operador
            <br />
            <select
              data-testid="comparison-filter"
              name="comparador"
              id="comparison-filter"
              value={ valoresSelecionados.comparador }
              onChange={ handleSeleciona }
            >
              {operador.map((el) => (
                <option key={ el }>{el}</option>
              ))}
            </select>
          </label>

        </div>
        <div>
          <input
            data-testid="value-filter"
            name="num"
            id="inputNumber"
            type="number"
            value={ valoresSelecionados.num }
            onChange={ handleSeleciona }
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="button-filter"
            id="btnFiltrar"
            onClick={ () => clicFiltrarbtn() }
          >
            FILTRAR
          </button>
        </div>
      </div>
      {
        paramsFiltrados.length > 0 ? (
          paramsFiltrados.map((elemento, indice) => (
            <div key={ indice } id="Filtro" data-testid="filter">
              <p>
                {`
                 ${elemento.coluna} ${elemento.comparador} ${elemento.num}
               `}
              </p>
              <button
                type="button"
                id="btnExcluir"
                onClick={ () => removeFiltros(elemento) }
              >
                X
              </button>
            </div>
          ))
        ) : ''
      }
      {
        paramsFiltrados.length > 0 && (
          <button
            type="button"
            id="btnExcluir"
            data-testid="button-remove-filters"
            onClick={ () => removeTodosOsFiltros() }
          >
            Remover Todos
          </button>
        )
      }
    </div>
  );
}

export default Filtro;
