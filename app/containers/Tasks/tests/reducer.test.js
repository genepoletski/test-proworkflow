/* We will be testing action creaters and reducers together,
 * beacause all the action creators do separately they return JS object
 */
import { fromJS } from 'immutable';

import {
  actionTasksFindTaskListRequest,
  actionTasksFindTaskListSucceed,
  actionTasksFindTaskListFail,
} from '../actions';

import tasksReducer from '../reducer';

describe('tasksReducer', () => {
  it('returns the initial state', () => {
    expect(tasksReducer(undefined, {}).toJS()).toBeDefined();
  });

  it('sets status loading on task list request', () => {
    const state = fromJS({ isLoading: false });

    expect(
      tasksReducer(state, actionTasksFindTaskListRequest())
        .toJS())
        .toMatchObject({
          isLoading: true,
        });
  });

  it('unsets status loading on task list succeed', () => {
    const state = fromJS({ isLoading: true });

    expect(
      tasksReducer(state, actionTasksFindTaskListSucceed({
        count: 143,
        tasks: [],
        totalcount: 143,
      }))
        .toJS())
        .toMatchObject({
          isLoading: false,
        });
  });

  it('unsets status loading on task list fail', () => {
    const state = fromJS({ isLoading: true });

    expect(
      tasksReducer(state, actionTasksFindTaskListFail({
        message: 'Something bad has happened recently',
      }))
        .toJS())
        .toMatchObject({
          isLoading: false,
        });
  });

  it('stores task list after successful fetching properly', () => {
    const prevState = fromJS({
      tasksByIds: {},
      tasksCategoriesByIds: {},
    });

    const receivedTasks = [
      {
        id: 119,
        projectcategoryid: 42,
        projectcategoryname: 'Marketing',
        name: 'Integrate 0800 Pizzas',
      },
      {
        id: 120,
        projectcategoryid: 42,
        projectcategoryname: 'Marketing',
        name: 'CONTENT AND TESTING',
      },
      {
        id: 121,
        projectcategoryid: 57,
        projectcategoryname: 'Logistics',
        name: 'Deliver laptops',
      },
      {
        id: 122,
        projectcategoryid: 57,
        projectcategoryname: 'Logistics',
        name: 'Improve tracking system',
      },
    ];

    const nextState = {
      tasksByIds: {
        119: {
          id: 119,
          projectcategoryid: 42,
          projectcategoryname: 'Marketing',
          name: 'Integrate 0800 Pizzas',
        },
        120: {
          id: 120,
          projectcategoryid: 42,
          projectcategoryname: 'Marketing',
          name: 'CONTENT AND TESTING',
        },
        121: {
          id: 121,
          projectcategoryid: 57,
          projectcategoryname: 'Logistics',
          name: 'Deliver laptops',
        },
        122: {
          id: 122,
          projectcategoryid: 57,
          projectcategoryname: 'Logistics',
          name: 'Improve tracking system',
        },
      },
      categoriesByIds: {
        42: {
          id: 42,
          name: 'Marketing',
          tasksIds: [119, 120],
        },
        57: {
          id: 57,
          name: 'Logistics',
          tasksIds: [121, 122],
        },
      },
    };

    expect(
      tasksReducer(prevState, actionTasksFindTaskListSucceed({
        count: 4,
        tasks: receivedTasks,
        totalcount: 4,
      }))
        .toJS())
        .toMatchObject(nextState);
  });
});
