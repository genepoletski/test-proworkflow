# Test for Proworkflow

(*) Project Boilerplate kindly provided by [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## REST API
### Haders
| Key | Value |
|---|---|
| Authorization | Basic ZzFrSmZTazczaGo6dUg4M2s5cVc1MTNiY3pEMTg= |
| apikey | VE4J-DTOL-GB9N-GPB9-PWFISMQ-DEV3572 |


### Tasks
#### Tasks list
| Task data | URL query field name |
|---|---|
| Completed | completedate |
| Due date | duedate |
| Project category | projectcategory |
| Project | project | project |
| Time spent | timetracked |
| Time allocated | timeallocated |

HTTP request:

GET https://api.proworkflow.net/tasks?fields=name,project,projectcategory,timeallocated,timetracked
