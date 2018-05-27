import { createSelector } from 'reselect';

const selectTasksDomain = (state) => state.get('tasks');
const selectTasksByIds = (state) => selectTasksDomain(state).get('tasksByIds');
const selectCategoriesByIds = (state) => selectTasksDomain(state).get('categoriesByIds');
const selectSelectedCategoryId = (state) => selectTasksDomain(state).get('selectedCategoryId');


const makeSelectCategoryList = () => createSelector(
  selectCategoriesByIds,
  (categoriesState) => categoriesState
    .map((category) => {
      const categoryId = category.get('id');
      const categoryName = category.get('name');

      const categoryListItem = {
        id: categoryId,
        name: categoryName,
      };

      return categoryListItem;
    })
    .toArray(),
);

const makeSelectActiveCategoryTaskList = () => createSelector(
  [selectSelectedCategoryId, selectTasksByIds],
  (selectedCategoryId, tasksByIdsState) => tasksByIdsState
    .filter((task) => task.get('projectcategoryid') === selectedCategoryId)
    .map((task) => task.toJS())
    .toArray(),
);

export {
  selectTasksDomain,
  makeSelectCategoryList,
  makeSelectActiveCategoryTaskList,
};
