import { ApplicationState } from "..";

export const orderSelector = (state: ApplicationState) => state.order;

export const orderItemsSelector = (state: ApplicationState) =>
  orderSelector(state).order;
export const orderDeliverySelector = (state: ApplicationState) =>
  orderItemsSelector(state).deliveryType;
export const orderIsShowingSelector = (state: ApplicationState) =>
  orderSelector(state).isShowing;
export const orderLoadingSelector = (state: ApplicationState) =>
  orderSelector(state).isLoading;
