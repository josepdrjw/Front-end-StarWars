// import dadosRecebidos from './testData';

const request = async () => {
  try {
    const ENDPOINT = 'https://swapi.dev/api/planets';
    const resposta = await fetch(ENDPOINT);
    const dadosRecebidos = await resposta.json();
    return dadosRecebidos.results;
  } catch (error) {
    return error.message;
  }
};

// const request = () => dadosRecebidos.results;

export default request;
