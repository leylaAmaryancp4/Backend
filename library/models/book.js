class Book {
    constructor(title, author, year, isBorrowed = false){
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = isBorrowed

    }


borrow(){
    if(this.isBorrowed){
        return `The Book "${this.title}" is already borrowed`;
}
this.isBorrowed = true;
return `The Book "${this.title}" has been borrowed.`
}


returnBook(){
    if(!this.isBerrowed)
    {
        return `The Book "${this.title}" is not berrowed.`
    }
    this.isBerrowed = false;
    return `The Book "${this.title}" has been returned.`;
}

}
module.exports = Book;