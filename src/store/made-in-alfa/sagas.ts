import { call, put, takeLatest } from 'redux-saga/effects';
import { getProducts } from 'api/made-in-alfa/get-products';
import { ProductsType } from 'store/types';
import { madeInAlfaActions } from '.';

function* getMadeInAlfaSaga() {
  try {
    const products: ProductsType[] = yield call(getProducts);

    yield put(madeInAlfaActions.success(products));
  } catch (e) {
    yield put(madeInAlfaActions.failure);
  }
}

export function* watchMadeInAlfaSaga() {
  yield takeLatest(madeInAlfaActions.request.type, getMadeInAlfaSaga);
}
