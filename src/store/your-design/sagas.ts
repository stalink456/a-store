import { getGroups } from "api/your-design/get-groups";
import { call, put, takeLatest } from "redux-saga/effects";
import { GroupsType } from "store/types";
import { yourDesignActions } from ".";

function* getYourDesignSaga() {
  try {
    const groups: GroupsType[] = yield call(getGroups);

    yield put(yourDesignActions.success(groups));
  } catch (e) {
    yield put(yourDesignActions.failure);
  }
}

export function* watchYourDesignSaga() {
  yield takeLatest(yourDesignActions.request.type, getYourDesignSaga);
}
