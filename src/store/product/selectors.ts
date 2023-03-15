import { ApplicationState } from "..";

export const productSelector = (state: ApplicationState) => state.product;

export const productItemsSelector = (state: ApplicationState) =>
  productSelector(state).items;
export const productIsLoadingSelector = (state: ApplicationState) =>
  productSelector(state).isLoading;
export const productIsErrorSelector = (state: ApplicationState) =>
  productSelector(state).hasError;
