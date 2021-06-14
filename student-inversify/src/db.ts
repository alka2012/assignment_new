import { createConnection,getMongoManager } from "typeorm";
import { Student } from "./entity/Student";
import { Book } from "./entity/Book";

export async function getDbConnection() {

    const conn = await createConnection({
      type: "mongodb",
      host: "localhost", 
      port: 27017, 
      database: "test",
      synchronize: true,
      entities: [
         "build/entity/**/*.{ts,js}"
      ],
      migrations: [
         "build/migration/**/*.{ts,js}"
      ],
      subscribers: [
         "src/subscriber/**/*.ts"
      ],
      cli: {
         entitiesDir: "src/entity",
         migrationsDir: "src/migration",
         subscribersDir: "src/subscriber"
      }
    });
    
    const manager = getMongoManager();
    const student = new Student();
    student.Name = "Sew";
    student.Country = "Malaysia";
    student.Age = 20;
    student.Books = [
      new Book("1111", "Life Of Pi", "Author 1"),
      new Book("21", "Ekigai", "Author 2"),
    ];
    await manager.save(student);
    const student1 = new Student();
    student1.Country = "England";
    student1.Name = "John";
    student1.Age = 12;
    await manager.save(student1);

    return conn;

}