
let Book = require('../models/book.js')
let Member = require('../models/member.js')

let books = [];
let members = []

function addBook(book){
    books.push(book)
    }


function addMember(member){
    members.push(member);
}


function findBook(title){
    if(!title){
        return "Not availabel";
}
return books.find(book=>book.title === title);
}


function findMember(id){
    if(!id){
        return " id not found";
    }else{
        return members.find(m=>m.memberId === id);
}
}


function borrow(title, memberId){
    let book = findBook(title);
    let member = findMember(memberId);
    if(!book)return `Book  ${title} not found.`;
    if(member) return `member with id "${memberId}" not found`;

    return member.borrowBook(book);
}
        

     function Return(title, memberId){
        let book = findBook(title);
        let member = findMember(memberId);
       if(!book)return `Book "${title}" not found.`;
       if(!member)return `member id "${memberId}" not found.`;
       return member. returnBook(book);
}





module.exports = {addBook,addMember, findBook,findMember, borrow, Return};
