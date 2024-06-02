import axios from 'axios';
import {gestEduApi} from '../../config/api/GestEduApi';
import type {AuthResponse} from '../../infrastructure/interfaces/auth.responses';
import { API_URL } from '@env';
import { User } from '../../domain/entities/user';

const returnUserToken = (response: AuthResponse) => {
  return {
    token: response.jwt,
  };
};



export const authLogin = async (email: string, password: string) => {
  //email = email.toLowerCase();
  // console.log("API_URL:", API_URL);

  try {
    const {data} = await gestEduApi.post('/login' /*axios.post(`${API_URL}/login`*/, {
      email,
      password,
    });
    console.log('HOLA LLEGA ACA linea 20 auth.ts');

    return returnUserToken(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      console.log(error.request);
    } else {
      console.error(error);
    }
    console.log('HOLA NO LLEGA ACA linea 24 auth.ts' + error);
    return null;
  }
};

export const authRegister = async (user:User) => {
  try {
    const {data} = await gestEduApi.post('/registro', user);
    console.log(
      "data:"+{data});
    
    return returnUserToken(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    console.log(error.request);
    } else {
      console.error(error);
    }
    console.log('HOLA NO LLEGA ACA linea 24 auth.ts' + error);
    return null;
  }
};

export const Authlogout = async () => { 
  try {
    const response = await gestEduApi.post('/logout');
    console.log("RESPONDE LOGOUT: "+response.data);
    
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("EL ERROR ES : " + error.message);
      console.log("LA DATA DEL ERROR ES: " + error.cause);
    } else {
      console.error(error);
    }
    console.log('HOLA NO LLEGA ACA linea 24 auth.ts' + error);
    return null;
  }
};
