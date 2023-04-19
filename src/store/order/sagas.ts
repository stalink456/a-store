import { call, put, takeLatest } from 'redux-saga/effects';
import { OrderType } from 'types';
import { orderActions } from './slice';
import { postOrder } from 'api/order/post-order';
import { notificationsActions } from '../notifications';
import { PayloadAction } from '@reduxjs/toolkit';

function* postOrderSaga(props: PayloadAction<OrderType>) {
  try {
    const response: string = yield call(postOrder, props['payload']);

    yield put(orderActions.success());
    yield put(
      notificationsActions.notifications({
        title: response,
        badge: 'positive',
      })
    );
  } catch (e) {
    yield put(orderActions.failure());
    yield put(
      notificationsActions.notifications({
        title: 'Произошла ошибка',
        badge: 'negative',
      })
    );
  }
}

export function* watchCreateOrderSaga() {
  yield takeLatest(orderActions.request.type, postOrderSaga);
}
