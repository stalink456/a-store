import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderinitialStateType } from "./types";
import { OrderType, DeliveryType } from "types";

const initialState: OrderinitialStateType = {
  order: {
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryType: null,
    promocode: "",
    isAgree: false,
    comment: "",
    paymentType: null,
  },
  isShowing: false,
  isLoading: false,
};

const NAME = "order";

const openOrder: CaseReducer<OrderinitialStateType, PayloadAction<boolean>> = (
  state,
  { payload }
) => {
  state.isShowing = payload;
};

const addDelivery: CaseReducer<
  OrderinitialStateType,
  PayloadAction<DeliveryType>
> = (state, { payload }) => {
  state.order.deliveryType = payload;
};

const request: CaseReducer<OrderinitialStateType, PayloadAction<OrderType>> = (
  state
) => {
  state.isLoading = true;
};

const success: CaseReducer<OrderinitialStateType> = (state) => {
  state.isLoading = false;
};

const failure: CaseReducer<OrderinitialStateType> = (state) => {
  state.isLoading = false;
};

export const { actions: orderActions, reducer: orderReducer } = createSlice({
  name: NAME,
  initialState: initialState,
  reducers: {
    openOrder,
    addDelivery,
    request,
    success,
    failure,
  },
});
