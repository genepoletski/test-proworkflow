import {
  ACTION_TASKS_FIND_TASK_LIST_REQUESTED,
  ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED,
  ACTION_TASKS_FIND_TASK_LIST_FAILED,
  ACTION_TASKS_CHANGE_CATEGORY,
} from './actionTypes';

export function actionTasksFindTaskListRequest() {
  return {
    type: ACTION_TASKS_FIND_TASK_LIST_REQUESTED,
    payload: null,
  };
}

export function actionTasksFindTaskListSucceed({
  count,
  tasks,
  totalcount,
}) {
  return {
    type: ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED,
    payload: {
      count,
      tasks,
      totalcount,
    },
  };
}

export function actionTasksFindTaskListFail({ message }) {
  return {
    type: ACTION_TASKS_FIND_TASK_LIST_FAILED,
    payload: new Error(message),
    error: true,
  };
}

export function actionTasksChangeCategory({ categoryId }) {
  return {
    type: ACTION_TASKS_CHANGE_CATEGORY,
    payload: {
      categoryId,
    },
  };
}
