import React, { useState, useContext } from 'react';
import DadosContext from '../Context/DadosContext';
import Carregando from './Carregando';
import './table.css';
// renderiza dados retornado da api
function Table() {
  const { dados, handleInputBusca, buscado } = useContext(DadosContext);

  const [valorColuna, setValorColuna] = useState('population');
  const [valorOperador, setValorOperador] = useState('maior que');
  const [valorNum, setValorNum] = useState(0);

  const coluna = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const operador = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const defineColuna = ({ target }) => {
    setValorColuna(target.value);
  };

  const defineOperador = ({ target }) => {
    setValorOperador(target.value);
  };

  const defineNum = ({ target }) => {
    setValorNum(target.value);
  };

  // const FILTRAR = () => {
  //   const parametros = [valorColuna, valorOperador, valorNum];
  //   switch (valorOperador) {
  //   case 'maior que':
  //     parametros.valorOperador = '>';
  //     break;
  //   case 'menor que':
  //     parametros.valorOperador = '<';
  //     break;
  //   case 'igual a':
  //     parametros.valorOperador = '=';
  //     break;
  //   default:
  //     break;
  //   }
  //   console.log(`${valorColuna} ${parametros.valorOperador}  ${valorNum}`);
  //   return res = dados.map((planeta) => valorColuna > valorNum(
  //     setResFiltro(planeta),
  //   ));
  // };

  console.log(dados);
  console.log(`Coluna: ${valorColuna}`);
  console.log(`Operador: ${valorOperador}`);
  console.log(`Numero: ${valorNum}`);
  // console.log(`Filtrado: ${resFiltro}`);

  return (
    <div>
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
          <label htmlFor="tag">
            Coluna
            <br />
            <select
              data-testid="column-filter"
              value={ valorColuna }
              onChange={ defineColuna }
            >
              {coluna.map((el) => (
                <option key={ el }>{el}</option>
              ))}
            </select>
          </label>
        </div>
        <div id="opredaroOptions">
          <label htmlFor="tag">
            Operador
            <br />
            <select
              data-testid="comparison-filter"
              value={ valorOperador }
              onChange={ defineOperador }
            >
              {operador.map((el) => (
                <option key={ el }>{el}</option>
              ))}
            </select>
          </label>

        </div>
        <div>
          <input
            id="inputNumber"
            type="number"
            data-testid="value-filter"
            value={ valorNum }
            onChange={ defineNum }
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="button-filter"
            id="btnFiltrar"
            // onClick={ FILTRAR }
          >
            FILTRAR
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            dados.length > 0 ? dados
              .filter((filtrado) => (filtrado.name.toLowerCase().includes(buscado)))
              .map((planeta, indice) => (
                <tr key={ indice }>
                  <td>{planeta.name}</td>
                  <td>{planeta.rotation_period}</td>
                  <td>{planeta.orbital_period}</td>
                  <td>{planeta.diameter}</td>
                  <td>{planeta.climate}</td>
                  <td>{planeta.gravity}</td>
                  <td>{planeta.terrain}</td>
                  <td>{planeta.surface_water}</td>
                  <td>{planeta.population}</td>
                  <td>{planeta.films}</td>
                  <td>{planeta.created}</td>
                  <td>{planeta.edited}</td>
                  <td>{planeta.url}</td>
                </tr>
              )) : <Carregando />
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
