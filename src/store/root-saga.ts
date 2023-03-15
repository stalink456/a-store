import { all, fork } from "redux-saga/effects";
import { watchMadeInAlfaSaga } from "./made-in-alfa";
import { watchProductSaga } from "./product/sagas";
import { watchYourDesignSaga } from "./your-design";
import { watchCreateOrderSaga } from "./order/sagas";

export function* rootSaga() {
  yield all([
    fork(watchMadeInAlfaSaga),
    fork(watchYourDesignSaga),
    fork(watchProductSaga),
    fork(watchCreateOrderSaga),
  ]);
}
