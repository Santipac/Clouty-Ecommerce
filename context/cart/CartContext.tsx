import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  subTotal: number;
  taxes: number;
  total: number;
  shippingAddress?: ShippingAddress;

  //Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
