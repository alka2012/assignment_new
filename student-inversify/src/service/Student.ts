import { injectable, inject } from "inversify";

import { MongoRepository, ObjectID } from "typeorm";
import { Book } from "../entity/Book";
import { Student } from "../entity/Student";
import { TYPE } from "../helpers/types";
export interface IStudent {
  id: ObjectID;
  Name: string;
  Country: string;
  Age: number;
  Books: IBook[];
}

export interface IBook {
  bookId: string;
  bookName: string;
  bookAuthour: string;
}

export interface IGetStudentQuery {
  sortOrder: string;
  perPage: number;
  page: number;
  sortByColumn: string;
}

@injectable()
export class StudentService {
  private readonly _StudentRepository: MongoRepository<Student>;
  public constructor(
    @inject(TYPE.StudentRepository) StudentRepository: MongoRepository<Student>
  ) {
    this._StudentRepository = StudentRepository;
  }

  public getStudent(queryParams: IGetStudentQuery): Promise<IStudent[]> {
    const { sortOrder, perPage, page, sortByColumn } = queryParams;
    return this._StudentRepository.find({
      order: { [sortByColumn]: sortOrder },
      skip: page * perPage,
      take: perPage,
    });
  }

  public async createBook(studentId: ObjectID, book: IBook): Promise<any> {
    let StudentToUpdate = await this._StudentRepository.findOne(studentId);

    if (StudentToUpdate) {
      const addBook = new Book(book.bookId, book.bookName, book.bookAuthour);
      if (StudentToUpdate.Books)
        StudentToUpdate.Books = [...StudentToUpdate.Books, addBook];
      else StudentToUpdate.Books = [addBook];
      return this._StudentRepository.update(studentId, StudentToUpdate);
    }
  }
}
