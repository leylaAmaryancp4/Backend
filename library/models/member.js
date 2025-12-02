class Member {
    constructor(name,  memberId ,borrowBooks = []){
        this.name = name;
        this.memberId = memberId;
        this.borrowBooks = borrowBooks
    }

borrowBook(book){
    
    if(this.isBorrowed){
        return `The book "${this.title}" has already been borrowed by someone.`;
     }

     if(this.borrowBooks.includes(book)){
        return ` You have already borrowed the book "${this.title}"`;
     }
     book.isBorrowed = true;
     this.borrowBooks.push(book);
     return `The book "${this.title}" have successfully borrowed by ${this.name}, ${this.memberId}`;

}


returnBook(book){
    if(!this.borrowBooks.includes(book)){
        return `The book "${this.title}" was not borrowed by ${this.name}.`;
    }
    this.borrowBooks = this.borrowBooks.filter(b => b.title !== book.title);
    book.isBorrowed = false;
     return `The book "${this.title}" has been returned by ${this.name}, ${this.memberId}.`;

}
}
 module.exports = Member;
