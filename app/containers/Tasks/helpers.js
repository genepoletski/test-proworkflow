export function mapCategoryListToDropdown(categoryList = []) {
  return categoryList.map(({ id, name}) => ({ text: name, value: id }));
}


export function mapTaskListToReactTrello(taskList = []) {
  const tasksInProgressList = [];
  const tasksCompleteList = [];
  const totalCount = taskList.length;

  taskList.forEach((task) => {
    if (task.completedate) {
      tasksCompleteList.push(task);
      return;
    }

    tasksInProgressList.push(task);
  });

  const tasksInProgressCount = tasksInProgressList.length;
  const tasksCompleteCount = tasksCompleteList.length;

  return [
    {
      id: '1',
      label: `${tasksInProgressCount} / ${totalCount}`,
      title: 'In Progress',
      cards: tasksInProgressList,
    },
    {
      id: '2',
      label: `${tasksCompleteCount} / ${totalCount}`,
      title: 'Complete',
      cards: tasksCompleteList,
    },
  ];
}
