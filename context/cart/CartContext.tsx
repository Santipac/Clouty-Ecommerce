import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  cart: ICartProduct[];
  addProductToCart: (cart: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
