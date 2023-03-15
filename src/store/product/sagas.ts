import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getProduct } from "api/product/get-product";
import { ProductsType } from "store/types";
import { productActions } from "./slice";

function* productSaga(props: PayloadAction<number>) {
  try {
    const product: ProductsType = yield call(getProduct, props.payload);

    yield put(productActions.success(product));
  } catch (e) {
    yield put(productActions.failure);
  }
}

export function* watchProductSaga() {
  yield takeLatest(productActions.request.type, productSaga);
}
