import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import DadosProvider from '../Context/DadosProvider';
import testData from '../../cypress/mocks/testData';

  describe('taesta aplicação', () => {

      afterEach(() => jest.clearAllMocks());
      
    test('1 Verifica se a pagina tem um titulo', () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValue(testData),
      });

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const titulo = screen.getByRole('heading', {  name: /projeto planetas/i});
      expect(titulo).toBeInTheDocument();

    })

    test('2 Verifica se existe um input de pesquisa', async () => {
      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const campoInput = screen.getByTestId("name-filter");
      expect(campoInput).toBeInTheDocument;

    });

    test('4 Verifica se existe um botão Filtrar', () => {

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const btnFiltrar = screen.getByTestId("button-filter");
      expect(btnFiltrar).toBeInTheDocument();
    });

    test('5 Verifica se tem um input do tipo Number', () => {

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const inputNumber = screen.getByTestId("value-filter");
      expect(inputNumber).toBeInTheDocument();
    });

    test('6 Verifica se ao clicar no botão filtro exibe os paramentos filtrado', () => {

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const btnFiltro = screen.getByTestId("button-filter");
      userEvent.click(btnFiltro);

      const btnRmParamFiltrado = screen.getByText(/population maior que 0/i)
      expect(btnRmParamFiltrado).toBeVisible();  
    })

    test('7 Verifica se existe o botão de remover todos os filtros', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(testData),
      });

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );
      expect(global.fetch).toHaveBeenCalled();
      await waitFor(
        async () => {
          const planetaTest = screen.getByText('Hoth');
          expect(planetaTest).toBeInTheDocument(), { timeout: 2000 }
        }
      )
      
      const valorNum = screen.getByTestId('value-filter');
      userEvent.type(valorNum, "400");
      const opcColun1 = screen.getByRole('option', { name: 'population'}).selected;
      const opcOperador1 = screen.getByRole('option', { name: 'maior que'}).selected;
      const btnFiltro = screen.getByTestId("button-filter");

      expect(opcColun1).toBe(true);
      expect(opcOperador1).toBe(true);
      
      userEvent.click(btnFiltro);
      
      const comparador = screen.getByTestId('comparison-filter');
      const trocaComparador = screen.getByRole('option', {name: 'menor que'});
      userEvent.selectOptions(comparador, trocaComparador);
      
      const opcColuna = screen.getByTestId('column-filter');
      const trocaOpcColuna = screen.getByRole('option', {name: 'diameter'});
      userEvent.selectOptions(opcColuna, trocaOpcColuna);  
      userEvent.type(valorNum, "12500");
      userEvent.click(btnFiltro);

      const trocaComparador2 = screen.getByRole('option', {name: 'igual a'});
      userEvent.selectOptions(comparador, trocaComparador2);
      
      const opcColuna2 = screen.getByTestId('column-filter');
      const trocaOpcColuna2 = screen.getByRole('option', {name: 'rotation_period'});
      userEvent.selectOptions(opcColuna2, trocaOpcColuna2);  
      userEvent.type(valorNum, "23");
      userEvent.click(btnFiltro);

      const btnRemoveFiltro = screen.getAllByRole('button', {name: 'X'});
      userEvent.click(btnRemoveFiltro[0]);

      const btnRmParamFiltrado = screen.getByTestId("button-remove-filters");
      expect(btnRmParamFiltrado).toBeInTheDocument();
      userEvent.click(btnRmParamFiltrado)
    })

    test('9 Verifica se recebe dados da api', async () => {
      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      global.fetch = jest.fn(() =>{
        Promise.resolve({
          json: () => Promise.resolve(testData),
        })
      })
  
    });

    test('10 Verifica se existe a tabela', () => {

      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const tabela = screen.queryByRole("table");
      expect(tabela).toBeInTheDocument();
    });

    test('11 Verifica a colunas da tabela', () => {
      
      render(
        <DadosProvider>
          <App />
        </DadosProvider>
      );

      const colunaNome = screen.getByRole('columnheader', {  name: /name/i})
      expect(colunaNome).toBeInTheDocument();

      const colunaPeriodoOrbital = screen.getByRole('columnheader', {  name: /rotation period/i});
      expect(colunaPeriodoOrbital).toBeInTheDocument();

      const colunaPeriodoRotacao = screen.getByRole('columnheader', {  name: /orbital period/i});
      expect(colunaPeriodoRotacao).toBeInTheDocument();

      const colunaDiamentro = screen.getByRole('columnheader', {  name: /diameter/i});
      expect(colunaDiamentro).toBeInTheDocument();

      const colunaClima = screen.getByRole('columnheader', {  name: /climate/i});
      expect(colunaClima).toBeInTheDocument();

      const colunaGravidade = screen.getByRole('columnheader', {  name: /gravity/i});
      expect(colunaGravidade).toBeInTheDocument();

      const colunaTerreno = screen.getByRole('columnheader', {  name: /terrain/i});
      expect(colunaTerreno).toBeInTheDocument();
      
      const colunaAguaSuprficie = screen.getByRole('columnheader', {  name: /surface water/i});
      expect(colunaAguaSuprficie).toBeInTheDocument();

      const colunaPopulacao = screen.getByRole('columnheader', {  name: /population/i});
      expect(colunaPopulacao).toBeInTheDocument();

      const colunaFilme = screen.getByRole('columnheader', {  name: /films/i});
      expect(colunaFilme).toBeInTheDocument();

      const colunaCriado = screen.getByRole('columnheader', {  name: /created/i});
      expect(colunaCriado).toBeInTheDocument();

      const colunaEditado = screen.getByRole('columnheader', {  name: /edited/i});
      expect(colunaEditado).toBeInTheDocument();

      const colunaUrl = screen.getByRole('columnheader', {  name: /url/i});
      expect(colunaUrl).toBeInTheDocument();
    });

  });

