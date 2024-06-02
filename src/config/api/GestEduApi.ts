import axios from 'axios';
import {API_URL} from '@env';
import {StorageAdapter} from '../adapters/storage';

console.log('API_URL:', API_URL);

const gestEduApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

gestEduApi.interceptors.request.use(async config => {
  if (config.url !== '/login' && config.url !== '/usuario/registro') {
    const token = await StorageAdapter.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});


export {gestEduApi};