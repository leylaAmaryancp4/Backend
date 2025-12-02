//Create books, members, register, borrow, return.

let Book = require('./models/book');
let Member = require('./models/member');
let libraryService = require('./services/libraryService');

let book1 = new Book("1984", "George Orwell", 1949 );
let book2 = new Book("To kill a Mockingbird", "Harper Lee", 1960);

let member1 = new Member("Alice",1, []);
let member2 = new Member("Bob",2 ,[]);

 libraryService.addBook(book1);
 libraryService.addBook(book2);
 libraryService.addMember(member1);
libraryService.addMember(member2);

console.log(libraryService.borrow("1984", 1));
console.log(libraryService.borrow("1984", 2));
console.log(libraryService.Return("1984", 1));
console.log(libraryService.borrow("1984", 2));  
