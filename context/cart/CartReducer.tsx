import { ICartProduct } from '@/interfaces';
import { CartState } from './CartProvider';

type CartActionType =
  | {
      type: '[Cart] - LoadCart from cookie | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Update products in cart';
      payload: ICartProduct[];
    }
  | {
      type: '[Cart] - Change cart quantity';
      payload: ICartProduct;
    }
  | {
      type: '[Cart] - Remove product from cart';
      payload: ICartProduct;
    }
  | {
      type: '[Cart] - Update order summary';
      payload: {
        numberOfItems: number;
        subTotal: number;
        taxes: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookie | storage':
      return { ...state, cart: [...action.payload] };
    case '[Cart] - Update products in cart':
      return { ...state, cart: [...action.payload] };
    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          product.quantity = action.payload.quantity;
          return action.payload;
        }),
      };
    case '[Cart] - Remove product from cart':
      return {
        ...state,
        cart: state.cart.filter(product => {
          if (product._id === action.payload._id) {
            if (product.size === action.payload.size) return false;
          }
          return true;
        }),
      };
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
