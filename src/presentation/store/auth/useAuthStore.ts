import {create} from 'zustand';
import {AuthStatus} from '../../../infrastructure/interfaces/auth.status';
import {Authlogout, authLogin, authRegister} from '../../../actions/auth/auth';
import {StorageAdapter} from '../../../config/adapters/storage';
import {User} from '../../../domain/entities/user';

export interface AuthState {
  status: AuthStatus;
  token?: string;

  login: (email: string, password: string) => Promise<Boolean>;
  register: (user: User) => Promise<Boolean>;
  logout: () => Promise<Boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    console.log("ES EL TOKEN DEL USEAUTHSTORE: "+resp?.token);

    if (!resp) {
      set({status: 'unauthenticated', token: undefined});
      return false;
    }
    await StorageAdapter.clear();
    const test = await StorageAdapter.getItem('token');
    console.log("Token despues de borrar: "+test);
    
    await StorageAdapter.setItem('token', resp.token);

    set({status: 'authenticated', token: resp.token});
    return true;
  },

  register: async (user: User) => {
    const resp = await authRegister(user);
    if (!resp) {
      set({status: 'unauthenticated', token: undefined});
      return false;
    }
    await StorageAdapter.clear();
    
    await StorageAdapter.setItem('token', resp.token);
    set({status: 'authenticated', token: resp.token});
    return true;
  },

  logout: async () => {
    const test = await StorageAdapter.getItem('token');
    console.log("Token antes de logout: "+test);
    const resp = await Authlogout();
    if (resp) {
      set({status: 'unauthenticated', token: undefined});
      await StorageAdapter.removeItem('token');
      return true;
    }
    return false;
  },
}));
