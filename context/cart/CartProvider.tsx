import { ICartProduct } from '@/interfaces';
import { FC, useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './CartReducer';

export interface CartState {
  cart: ICartProduct[];
}

interface Children {
  children: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE = {
  cart: [],
};

export const CartProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};
