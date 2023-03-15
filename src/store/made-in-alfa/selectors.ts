import { ApplicationState } from "..";

export const madeInAlfaSelector = (state: ApplicationState) => state.madeInAlfa;

export const madeInAlfaProductsSelector = (state: ApplicationState) =>
  madeInAlfaSelector(state).products;
export const madeInAlfaIsLoadingSelector = (state: ApplicationState) =>
  madeInAlfaSelector(state).isLoading;
export const madeInAlfaIsErrorSelector = (state: ApplicationState) =>
  madeInAlfaSelector(state).hasError;
