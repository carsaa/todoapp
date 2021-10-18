**RUNNING TODOAPP**

1. From /todoapp run command "docker-compose up --build" in terminal first time the application is started, next time run only "docker-compose up" 
2. Service will start and listen on http://localhost:5000

**RUNNING AUTOMATED TESTS**
1. From /todoapp run command "npm run test"

**CALLING AND TESTING API**
1. Run the command related to the operation you want to perforn in the terminal

Create todo
curl --location --request POST 'http://localhost:5001/todos' \
--header 'Content-Type: application/json' \
--data-raw '{ "listId": "abc123", "task": "Call Anna"}

Get todo
curl --location --request GET 'http://localhost:5001/todos'

Get todo by id
curl --location --request GET 'http://localhost:5001/todos/616c705d563840ef04db4f1b'

Update todo (set completed = true)
curl --location --request PATCH 'http://localhost:5001/todos/616c7108d06d62ab4ba513bd' \
--header 'Content-Type: application/json' \
--data-raw '{
    "completed": true}'

Delete todo
curl --location --request DELETE 'http://localhost:5001/todos/616c722798a42508f7b2f2d5'

Get todos by listId
curl --location --request GET 'http://localhost:5001/todos/list/abc123'


**IMPROVEMENTS**
- Store the database connection string in some sort of key vault and fetch it from there, it is now publicly exposed in github. 

- Create a List resource with its own model and route, instead of using '/todos/list/:id' and for enabling list creation.

- Limit character length of Todo.Task.

- Add retries if connecting to the database fails.

- Improve the error handling and return status codes. For instance, the GET by id returns a 404 Not found if something goes wrong, independently of whether it can't find the id or if there is an error with the database connection.

- Fix the failing tests.

