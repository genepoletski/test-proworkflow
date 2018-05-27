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
  ACTION_TASKS_CHANGE_CATEGORY,
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
function makeMapOfTasksByIds(origTasks) {
  const mapOfTasks = fromJS(origTasks);

  const tasksGrouppedByIds = mapOfTasks
    .groupBy((task) => task.get('id'))
    .map((tasks) => tasks.first());

  return tasksGrouppedByIds;
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
function makeMapOfTasksCategoriesByIds(origTasks) {
  const mapOfTasks = fromJS(origTasks);

  const tasksGrouppedByCategories = mapOfTasks
    .groupBy((task) => task.get('projectcategoryid'));

  const categoriesByIds = tasksGrouppedByCategories
    .map((prevTaskCategory) => {
      const firstCategoryTask = prevTaskCategory.first();
      const categoryId = firstCategoryTask.get('projectcategoryid');
      const categoryName = firstCategoryTask.get('projectcategoryname');
      const categoryTasksIds = prevTaskCategory.map((task) => task.get('id'));

      const nextCategoryMap = fromJS({
        id: categoryId,
        name: categoryName,
        tasksIds: categoryTasksIds,
      });

      return nextCategoryMap;
    });

  return categoriesByIds;
}

export const initialState = fromJS({
  isLoading: false,
  tasksByIds: {},
  categoriesByIds: {},
  selectedCategoryId: '',
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TASKS_FIND_TASK_LIST_REQUESTED:
      return state.set('isLoading', true);

    case ACTION_TASKS_FIND_TASK_LIST_SUCCEEDED:
      return state
        .set('isLoading', false)
        .set('tasksByIds', makeMapOfTasksByIds(action.payload.tasks))
        .set('categoriesByIds', makeMapOfTasksCategoriesByIds(action.payload.tasks));

    case ACTION_TASKS_FIND_TASK_LIST_FAILED:
      return state
        .set('isLoading', false);

    case ACTION_TASKS_CHANGE_CATEGORY:
      return state
        .set('selectedCategoryId', action.payload.categoryId);

    default:
      return state;
  }
}

export default tasksReducer;
