import { CartType } from 'types';

export type CartTypeInitialState = {
  items: CartType[];
  cartTotalPrice: number;
};

export type SetCartItemCountType = {
  value: number;
  id: string;
};
