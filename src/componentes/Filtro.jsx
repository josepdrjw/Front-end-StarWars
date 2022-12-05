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
    ComparaPlanetas,
    handleInputBusca,
    buscado,
    handleSeleciona,
    valoresSelecionados,
  } = useContext(DadosContext);

  const [paramsFiltrados, setParamsFiltrados] = useState([]);

  const clicFiltrarbtn = (() => {
    ComparaPlanetas();
    setParamsFiltrados([...paramsFiltrados, valoresSelecionados]);
  });

  console.log(paramsFiltrados);
  console.log(valoresSelecionados);

  const operador = [
    'maior que',
    'menor que',
    'igual a',
  ];

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
            type="text"
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
            <div key={ indice } id="Filtro">
              <p>
                {`
                 ${elemento.coluna} ${elemento.comparador} ${elemento.num}
               `}
              </p>
              <button
                type="button"
                id="btnExcluir"
              >
                X
              </button>
            </div>
          ))
        ) : ''
      }
    </div>
  );
}

export default Filtro;

// return (
//   <div id="Filtro">
//     {
//       testeFiltrados.length !== 0 ? (
//         <p>
//           {
//             `${testeFiltrados.coluna}
//            ${testeFiltrados.comparador}
//            ${testeFiltrados.num}`
//           }
//           <button
//             type="button"
//             id="btnExcluir"
//           >
//             Excluir
//           </button>
//         </p>
//       ) : ''
//     }
//   </div>
// );

// return (
//   <div>
//     {
//       testeFiltrados.length > 1 ? (
//         testeFiltrados.map((elemento, indice) => (
//           <div key={ indice } id="Filtro">
//             <p>
//               {`
//               ${elemento.coluna} ${elemento.comparador} ${elemento.num}
//               `}
//             </p>
//             <button
//               type="button"
//               id="btnExcluir"
//             >
//               Excluir
//             </button>
//           </div>
//         ))
//       ) : ''
//     }
//   </div>
// );
// }

// return (
//   <div>
//     {
//       testeFiltrados.length !== 0 ? (
//         testeFiltrados.map((elemento, indice) => (
//           <div key={ indice } id="Filtro">
//             <p>
//               {
//                 typeof (elemento.coluna) !== 'undefined'
//                   ? `${elemento.coluna} ${elemento.comparador} ${elemento.num}`
//                   : ''
//               }
//             </p>
//             <button
//               type="button"
//             >
//               Excluir
//             </button>
//           </div>
//         ))
//       ) : ''
//     }
//   </div>
// );
