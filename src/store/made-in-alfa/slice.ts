import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MadeInAlfaInitialStateType, ProductsType } from "store/types";

const initialState: MadeInAlfaInitialStateType = {
  products: [],
  isLoading: false,
  hasError: false,
};

const NAME = "made-in-alfa";

const request: CaseReducer<MadeInAlfaInitialStateType> = (state) => {
  state.isLoading = true;
  state.hasError = false;
};

const success: CaseReducer<
  MadeInAlfaInitialStateType,
  PayloadAction<ProductsType[]>
> = (state, { payload }) => {
  state.isLoading = false;
  state.hasError = false;
  state.products = payload;
};

const failure: CaseReducer<MadeInAlfaInitialStateType> = (state) => {
  state.isLoading = false;
  state.hasError = true;
};

export const { actions: madeInAlfaActions, reducer: madeInAlfaReducer } =
  createSlice({
    name: NAME,
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
    },
  });
