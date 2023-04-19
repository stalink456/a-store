import { ApplicationState } from '..';

export const cartSelector = (state: ApplicationState) => state.cart;

export const cartItemsSelector = (state: ApplicationState) =>
  cartSelector(state).items;
export const cartItemsLengthSelector = (state: ApplicationState) =>
  cartItemsSelector(state).length;
export const cartTotalPriceSelector = (state: ApplicationState) =>
  cartSelector(state).cartTotalPrice;
