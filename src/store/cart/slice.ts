import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice, generateID, getCartFromLS } from "utils/cart";
import { CartTypeInitialState, SetCartItemCountType } from "./types";
import { CartType } from "types";

const { items, cartTotalPrice } = getCartFromLS();

const initialState: CartTypeInitialState = {
  items,
  cartTotalPrice,
};

const NAME = "cart";

const addItem: CaseReducer<CartTypeInitialState, PayloadAction<CartType>> = (
  state,
  { payload }
) => {
  const itemId =
    payload.id + generateID(payload.color, payload.size, payload.stickerName);

  const findItem = state.items.find((obj) => obj.id === itemId);

  if (findItem) {
    findItem.totalCount++;
    findItem.totalPrice = findItem.totalCount * findItem.price;
  } else {
    state.items.push({
      ...payload,
      id: itemId,
      totalCount: 1,
    });
  }

  state.cartTotalPrice = calcTotalPrice(state.items);
};

const incrementItem: CaseReducer<
  CartTypeInitialState,
  PayloadAction<string>
> = (state, { payload }) => {
  const findItem = state.items.find((obj) => obj.id === payload);

  if (findItem) {
    findItem.totalCount++;
    findItem.totalPrice = findItem.totalCount * findItem.price;
    state.cartTotalPrice = calcTotalPrice(state.items);
  }
};

const decrementItem: CaseReducer<
  CartTypeInitialState,
  PayloadAction<string>
> = (state, { payload }) => {
  const findItem = state.items.find((obj) => obj.id === payload);

  if (findItem) {
    findItem.totalCount--;
    findItem.totalPrice = findItem.totalCount * findItem.price;
    state.cartTotalPrice = state.cartTotalPrice - findItem.price;
  }
};

const removeItem: CaseReducer<CartTypeInitialState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  const findItem = state.items.find((obj) => obj.id === payload);

  if (findItem) {
    state.items = state.items.filter((obj) => obj.id !== payload);
    state.cartTotalPrice =
      state.cartTotalPrice - findItem.price * findItem.totalCount;
  }
};

const setCount: CaseReducer<
  CartTypeInitialState,
  PayloadAction<SetCartItemCountType>
> = (state, { payload }) => {
  const findItem = state.items.find((obj) => obj.id === payload.id);

  if (findItem) {
    state.cartTotalPrice =
      state.cartTotalPrice - findItem.price * findItem.totalCount;
    findItem.totalCount = payload.value;
    findItem.totalPrice = findItem.totalCount * findItem.price;
    state.cartTotalPrice =
      state.cartTotalPrice + findItem.price * findItem.totalCount;
  }
};

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: NAME,
  initialState: initialState,
  reducers: {
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    setCount,
  },
});
