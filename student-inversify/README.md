# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run Docker command for MongoDB 
   MYSQL_DATABASE=test docker run -p 27017:27017 mongo:latest
4. Run `npm run-script build` command
5. Run `npm run-script start` command
6. Run `npm test` to execute test

Command to access endpoints
1. GET
   localhost:3000/api/student?sort_column=Name&page=1&perPage=1
2. POST
   localhost:3000/api/student/{studentId}/book
   payload
   {
    "bookId": "1231234",
    "bookName": "Book Name",
    "bookAuthour": “Some Author Name”
   }

