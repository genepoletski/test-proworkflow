import 'whatwg-fetch';

export async function apiFindTaskList() {
  const url = 'https://api.proworkflow.net/tasks?fields=name,project,projectcategory,timeallocated,timetracked,completedate';

  const requestConfig = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ZzFrSmZTazczaGo6dUg4M2s5cVc1MTNiY3pEMTg=',
      apikey: 'VE4J-DTOL-GB9N-GPB9-PWFISMQ-DEV3572',
    },
  };

  const response = await fetch(url, requestConfig);
  const json = response.toJSON();

  return json;
}
