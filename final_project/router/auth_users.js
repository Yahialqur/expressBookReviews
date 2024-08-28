const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

  const {username, password} = req.body;

  if(!username || !password){
    return res.status(400).json({message: "Username or Password not provided"});
  }
  const user = users[username];

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = jwt.sign({ username: username }, "access", { expiresIn: "1h" });

    // Save the token in the session
    req.session.authorization = { accessToken };

    return res.status(200).json({ message: "User logged in successfully", token: accessToken });

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbnOfBook = req.params.isbn;
    const newReview = req.query.review;
    const username = req.session.authorization?.username;

    // Check if the user is logged in
    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }
    // Check if the review text is provided
    if (!newReview) {
        return res.status(400).json({ message: "Review text is required" });
    }
    // Check if the book exists
    if (!books[isbnOfBook]) {
        return res.status(404).json({ message: "Book not found" });
    }
    // Check if the book already has reviews
    const bookReviews = books[isbnOfBook].reviews;
    
    // Add or modify the review
    bookReviews[username] = newReview;
    return res.status(200).json({ message: "Review added/updated successfully", reviews: bookReviews });
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
