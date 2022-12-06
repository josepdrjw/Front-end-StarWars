import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import starWarsMock from './starWarsMock';
import userEvent from '@testing-library/user-event';
import DadosProvider from '../Context/DadosProvider';

  describe('taesta aplicação', () => {

    afterEach(() => jest.clearAllMocks());

    test('Verifica o funcionamento correto dos inputs e filtros', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValue(starWarsMock),
      });      
    });

    render(
      <DadosProvider>
        <App />
      </DadosProvider>);

    const tituloDaPagina = screen.getByText("Projeto Planetas");
    const btnFiltro = screen.getByTestId("button-filter");

    expect(tituloDaPagina).toBeInTheDocument();
    expect(btnFiltro).toBeInTheDocument();
    
  })

