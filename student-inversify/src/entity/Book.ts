import { ObjectIdColumn, Column} from "typeorm";

export class Book {
    @Column() 
    bookId: string;
    
    @Column()
    bookName: string;

    @Column()
    bookAuthour: string;

    constructor(bookId: string, bookName: string, bookAuthour: string) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookAuthour = bookAuthour;
    }
}