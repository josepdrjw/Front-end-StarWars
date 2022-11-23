import React, { useState, useContext } from 'react';
import DadosContext from '../Context/DadosContext';
import './table.css';
// renderiza dados retornado da api
function Table() {
  const { dados } = useContext(DadosContext);
  const [buscado, setBuscado] = useState('');

  const inputBusca = ({ target }) => {
    setBuscado(target.value);
  };

  console.log(dados);

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
          onChange={ inputBusca }
        />
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
          {dados
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
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
