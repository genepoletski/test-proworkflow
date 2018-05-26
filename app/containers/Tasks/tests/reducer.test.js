/* We will be testing action creaters and reducers together,
 * beacause all the action creators do separately they return JS object
 */
import fromJS from 'immutable';

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

  it('unsets status loading on task list request', () => {
    const state = fromJS({ isLoading: true });

    expect(
      tasksReducer(state, actionTasksFindTaskListFail({
        message: 'Something bad has happened recently',
      }))
        .toJS())
        .toMatchObject({
          isLoading: true,
        });
  });
});
