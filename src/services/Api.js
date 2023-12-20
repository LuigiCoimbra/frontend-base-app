import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://riccidiogo.com.br:8056/',
});

export default Api