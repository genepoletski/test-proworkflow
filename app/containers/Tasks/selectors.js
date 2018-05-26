import { createSelector } from 'reselect';

const selectTasks = (state) => state.get('tasks');

const makeSelectTaskList = () => createSelector(
  selectTasks,
  (tasksState) => tasksState
    .get('tasksByIds')
    .map((task) => task.toJS())
    .toArray(),
);

export {
  selectTasks,
  makeSelectTaskList,
};
