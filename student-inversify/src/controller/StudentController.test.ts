import "reflect-metadata";
import { StudentController } from "./StudentController";
import { StudentService } from "../service/Student";

const mockReq = {
  body: {},
  params: {},
  query: {},
};
const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(() => mockRes),
  send: jest.fn(() => mockRes),
};
describe("StudentController", () => {
  let mockMongoDB;
  

  it("should call student service with default query params", async () => {
    const studentService = new StudentService(mockMongoDB);
    const spy = jest
      .spyOn(studentService, "getStudent")
      .mockResolvedValueOnce([]);
    const controller = new StudentController(studentService);
    const student = await controller.get(mockReq, mockRes);
    expect(student).toEqual([]);
    expect(spy).toHaveBeenCalledWith({
      page: 0,
      perPage: 10,
      sortByColumn: "Name",
      sortOrder: "ASC",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should call student service with correct query params", async () => {
    const studentService = new StudentService(mockMongoDB);
    const spy = jest
      .spyOn(studentService, "getStudent")
      .mockResolvedValueOnce([]);
    const controller = new StudentController(studentService);
    const mockReqwithQueryParams = {
      ...mockReq,
      query: { sort_column: "Age" },
    };
    await controller.get(mockReqwithQueryParams, mockRes);
    expect(spy).toHaveBeenCalledWith({
      page: 0,
      perPage: 10,
      sortByColumn: "Age",
      sortOrder: "ASC",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should call student service to update books", async () => {
    const studentService = new StudentService(mockMongoDB);
    const spy = jest
      .spyOn(studentService, "createBook")
      .mockResolvedValueOnce([]);
    const controller = new StudentController(studentService);
    const mockReqwithQueryParams = {
      ...mockReq,
      params: { id: "some_id" },
      body: {
        bookId: "Book_Id",
        bookName: "Some Name",
        bookAuthour: "Some Authour",
      },
    };

    await controller.createBook(mockReqwithQueryParams, mockRes);
    expect(spy).toHaveBeenCalledWith("some_id",mockReqwithQueryParams.body);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should not call student service if validation fail", async () => {
    const studentService = new StudentService(mockMongoDB);
    const spy = jest
      .spyOn(studentService, "createBook")
      .mockResolvedValueOnce([]);
    const controller = new StudentController(studentService);
    const mockReqwithQueryParams = {
      ...mockReq,
      params: { id: "some_id" },
      body: {
        bookId: "Book_Id",
        bookName: "Some Name",
      },
    };
    await controller.createBook(mockReqwithQueryParams, mockRes);
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });

});
