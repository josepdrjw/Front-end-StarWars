const request = async () => {
  try {
    const ENDPOINT = 'https://swapi.dev/api/planets';
    const resposta = await fetch(ENDPOINT);
    const dadosRecebidos = await resposta.json();
    return dadosRecebidos.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default request;
