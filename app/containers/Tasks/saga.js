import { call, put, takeLatest } from 'redux-saga/effects';

import {
  ACTION_TASKS_FIND_TASK_LIST_REQUESTED,
} from './actionTypes';

import {
  actionTasksFindTaskListSucceed,
  actionTasksFindTaskListFail,
} from './actions';

import {
  apiFindTaskList,
} from './api';


export function* findTaskList() {
  try {
    const response = yield call(apiFindTaskList);

    // HANDLE FAIL
    if (response.status !== 'Success') {
      const { message } = response;

      return yield put(
        actionTasksFindTaskListFail({ message }),
      );
    }

    // HANDLE SUCCESS
    const { count, tasks, totalcount } = response;

    return yield put(
      actionTasksFindTaskListSucceed({
        count,
        tasks,
        totalcount,
      }),
    );
  } catch (err) {
    return yield put(
      actionTasksFindTaskListFail({ message: err.message }),
    );
  }
}

export function* watchTaskListRequest() {
  yield takeLatest(
    ACTION_TASKS_FIND_TASK_LIST_REQUESTED,
    findTaskList
  );
}

export default function* tasksSaga() {
  yield [
    watchTaskListRequest(),
  ];
}
