import * as express from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  response,
  requestParam,
  request,
} from "inversify-express-utils";
import { MongoRepository, ObjectID } from "typeorm";
import { Student } from "../entity/Student";
import { TYPE } from "../helpers/types";
import Joi = require("joi");
import { StudentService } from "../service/Student";
import { ErrorHandler } from "../helpers/ErrorHandler";

@controller("/api")
export class StudentController {
  constructor(
    @inject(TYPE.StudentService) private StudentService: StudentService
  ) {}

  @httpGet("/student")
  public async get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    //try {
    const sortByColumn = req.query.sort_column || "Name";
    const sortOrder = req.query.sort_by || "ASC";
    const page = parseInt(req.query.page) || 0;
    const perPage = parseInt(req.query.perPage) || 10;
    return await this.StudentService.getStudent({
      sortByColumn,
      sortOrder,
      page,
      perPage,
    });
    // } catch (e) {
    //   res.status(500);
    //   res.send(e.message);
    // }
  }
  @httpPost("/student/:id/book")
  public async createBook(
    @request() request: express.Request,
    @response() res: express.Response
  ) {
    const { bookId, bookName, bookAuthour } = request.body;
    const BooksSchema = Joi.object({
      bookId: Joi.string().min(6).required(),
      bookName: Joi.string().min(3).required(),
      bookAuthour: Joi.string().min(3).required(),
    });
    const { error, value } = BooksSchema.validate(request.body);
    if (error) {
      res.status(404).json(error.details);
    } else {
      try {
        return await this.StudentService.createBook(
          request.params.id,
          request.body
        );
      } catch (e) {
        throw new ErrorHandler(500, e.message);
      }
    }
  }
}
