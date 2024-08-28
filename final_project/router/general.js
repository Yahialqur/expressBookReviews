const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//Done
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(JSON.stringify(books, null));
});

//Done
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbnOfBook = req.params.isbn;

  if(books[isbnOfBook]){
    return res.status(200).json(books[isbnOfBook]);
  }
  else {
    return res.status(404).json({message: "Book not found"});
  }

 });

//Done
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author.toLowerCase();
  const booksWithAuthor = [];
  const bookKeys = Object.keys(books);

  bookKeys.forEach(key => {
    if(books[key].author.toLowerCase() === authorName){
        booksWithAuthor.push(books[key]);
    }
  });
  if (booksWithAuthor.length > 0){
    return res.status(200).json(booksWithAuthor);
  }
  else {
    return res.status(404).json({message: "No books with this author"});
  }
});

//Done
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const bookTitle = req.params.title.toLowerCase();
  const booksWithTitle = [];
  const bookKeys = Object.keys(books);

  bookKeys.forEach(key => {
    if (books[key].title.toLowerCase() === bookTitle){
        booksWithTitle.push(books[key]);
    }
  });
  if (booksWithTitle.length > 0){
    return res.status(200).json(booksWithTitle);
  }
  else{
    return res.status(404).json({message: "No books with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbnOfBook = req.params.isbn;
  let theReview = null;

  if (books[isbnOfBook]){
    theReview = books[isbnOfBook].reviews;
  }
  if (theReview && Object.keys(theReview).length > 0){
    return res.status(200).json(theReview);
  }
  else{
    return res.status(404).json({message: "No review for this book"});
  }
});

module.exports.general = public_users;
