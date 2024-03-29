import { FC, useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSession, signOut } from 'next-auth/react';
import { CloutyApi } from '@/api';
import { useRouter } from 'next/router';
import { authReducer, AuthContext } from './';
import { IUser } from '@/interfaces';

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
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
    }
  }, [status, data]);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;
    try {
      const { data } = await CloutyApi.get('/user/validate-token');
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await CloutyApi.post('/user/login', {
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

  const logoutUser = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('phone');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');

    signOut();
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await CloutyApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return { hasError: false };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { hasError: true, message: error.response?.data.message };
      }
      return {
        hasError: true,
        message: 'Could not create the user. Please try again.',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
