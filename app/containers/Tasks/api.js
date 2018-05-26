import 'whatwg-fetch';

const restAPIbaseURL = 'https://api.proworkflow.net';


export async function apiFindTaskList() {
  try {
    const query = 'fields=name,project,projectcategory,timeallocated,timetracked,completedate';
    const url = (`${restAPIbaseURL}/tasks?${query}`);

    const requestConfig = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ZzFrSmZTazczaGo6dUg4M2s5cVc1MTNiY3pEMTg=',
        apikey: 'VE4J-DTOL-GB9N-GPB9-PWFISMQ-DEV3572',
      },
    };

    const response = await fetch(url, requestConfig);
    const json = response.json();

    return json;
  } catch (err) {
    throw err;
  }
}
