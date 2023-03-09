import { clothesApi } from '@/api';
import { IUser } from '@/interfaces';
import Cookies from 'js-cookie';
import { FC, useReducer } from 'react';
import { authReducer, AuthContext } from './';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface Children {
  children: JSX.Element | JSX.Element[];
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await clothesApi.post('/user/login', {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
