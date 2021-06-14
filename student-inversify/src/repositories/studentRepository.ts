import { getConnection } from "typeorm";
import { Student } from "../entity/Student";

export function getRepository() {
    const conn = getConnection();
    const StudentRepository = conn.getMongoRepository(Student);
    return StudentRepository;
}