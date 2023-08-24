import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8055',
});

export default Api