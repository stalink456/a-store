import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsType, ProductsTypeInititalState } from "store/types";

const initialState: ProductsTypeInititalState = {
  items: {} as ProductsType,
  isLoading: false,
  hasError: false,
};

const NAME = "product";

const request: CaseReducer<ProductsTypeInititalState, PayloadAction<number>> = (
  state
) => {
  state.isLoading = true;
  state.hasError = false;
};

const success: CaseReducer<
  ProductsTypeInititalState,
  PayloadAction<ProductsType>
> = (state, { payload }) => {
  state.items = payload;
  state.isLoading = false;
  state.hasError = false;
};

const failure: CaseReducer<ProductsTypeInititalState> = (state) => {
  state.isLoading = false;
  state.hasError = true;
};

export const { actions: productActions, reducer: productReducer } = createSlice(
  {
    name: NAME,
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
    },
  }
);
