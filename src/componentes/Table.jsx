import React, { useState, useEffect, useContext } from 'react';
import DadosContext from '../Context/DadosContext';
import Carregando from './Carregando';
import './table.css';
// renderiza dados retornado da api
function Table() {
  const { handleInputBusca,
    buscado, filtro, handleSeleciona, valoresSelecionados } = useContext(DadosContext);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  // const [valoresSelecionados, setValoresSelecionados] = useState({
  //   coluna: 'population',
  //   comparador: 'maior que',
  //   num: 0,
  // });
  // const [valorComparador, setValorOperador] = useState('maior que');
  // const [valorNum, setValorNum] = useState(0);

  console.log(filtro);

  useEffect(() => {
    setDadosFiltrados(filtro);
  }, [filtro]);

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

  // const handleSeleciona = ({ target }) => {
  //   setValoresSelecionados({
  //     ...valoresSelecionados,
  //     [target.name]: target.value,
  //   });
  // };

  // console.log(dados);
  console.log(`Coluna: ${valoresSelecionados.coluna}`);
  console.log(`Operador: ${valoresSelecionados.comparador}`);
  console.log(`Numero: ${valoresSelecionados.num}`);
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
              name="coluna"
              value={ valoresSelecionados.coluna }
              onChange={ handleSeleciona }
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
              name="comparador"
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
            dadosFiltrados.length > 0 ? dadosFiltrados
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
