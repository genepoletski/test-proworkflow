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


/**
 * 
 * @param {Array} origTasks Tasks list as an array of objects [ {...}, {...} ]
 *
 * @return {Map} Map with tasks, where keys are tasks ids and values are tasks
 *               example: Map {
 *                  119: { id: 119, name: '...' },
 *                  120: { id: 120, name: '...' },
 *               }
 */
function convertTasksToMapByIds(origTasks) {
  const mapOfTasks = fromJS(origTasks);

  const tasksGouppedByIds = mapOfTasks
    .groupBy((task) => task.get('id'))
    .map((tasks) => tasks.first());

  return tasksGouppedByIds;
}

/**
 * Creates immutable Map of Lists with tasks ids groupped by categories
 *
 * @param {Array} origTasks Tasks list as an array of objects [ {...}, {...} ]
 *
 * @return {Map} Map with Lists of tasks ids groupped by categories ids
 *               example: Map {
 *                 0: List [ 119, 120 ],
 *                 1: List [ 121, 122 ],
 *               }
 */
function makeMapOfTasksIds(origTasks) {
  const mapOfTasks = fromJS(origTasks);

  const tasksGrouppedByCategories = mapOfTasks
    .groupBy((task) => task.get('projectcategoryid'));

  const tasksIdsGrouppedByCategory = tasksGrouppedByCategories
    .map((tasks) => tasks.map((task) => task.get('id')));

  return tasksIdsGrouppedByCategory;
}

export const initialState = fromJS({
  isLoading: false,
  tasksByIds: {},
  tasksIdsByCategories: {},
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TASKS_FIND_TASK_LIST_REQUESTED:
      return state.set('isLoading', true);

    case ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED:
      return state
        .set('isLoading', false)
        .set('tasksByIds', convertTasksToMapByIds(action.payload.tasks))
        .set('tasksIdsByCategories', makeMapOfTasksIds(action.payload.tasks));

    case ACTION_TASKS_FIND_TASK_LIST_FAILED:
      return state.set('isLoading', false);

    default:
      return state;
  }
}

export default tasksReducer;
