import { AsyncContainerModule } from "inversify";
import {  MongoRepository } from "typeorm";
import { Student } from "./entity/Student";
import { getDbConnection } from "./db";
import { getRepository } from "./repositories/studentRepository";
import { TYPE } from "./helpers/types";
import { StudentService } from "./service/Student";


export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require("./controller/StudentController");
    
    bind<StudentService>(TYPE.StudentService).to(StudentService);
    bind<MongoRepository<Student>>(TYPE.StudentRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();

});