import axios from 'axios';
import {URL_API} from '@env';
import {StorageAdapter} from '../adapters/storage';


const gestEduApi = axios.create({
  baseURL: URL_API,
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