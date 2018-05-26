/*
 *
 * Tasks reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ACTION_TASKS_FIND_TASK_LIST_REQUESTED,
  ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED,
  ACTION_TASKS_FIND_TASK_LIST_FAILED,
} from './actionTypes';


export const initialState = fromJS({
  isLoading: false,
  tasksByIds: {},
  tasksByCategories: {},
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TASKS_FIND_TASK_LIST_REQUESTED:
      return state.set('isLoading', true);

    case ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED:
    case ACTION_TASKS_FIND_TASK_LIST_FAILED:
      return state.set('isLoading', false);

    default:
      return state;
  }
}

export default tasksReducer;
