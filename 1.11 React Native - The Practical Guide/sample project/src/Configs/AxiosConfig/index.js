import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://demo1483951.mockable.io/',
  timeout: 1000,
});

export default instance;