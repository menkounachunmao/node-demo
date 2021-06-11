/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:30
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-11 10:20:59
 * @FilePath: /helloworld/controllers/bookController.js
 */

const Book = require("../models/book");
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
const { body, validationResult, sanitizeBody } = require('express-validator');
const async = require("async");
exports.index = (req, res) => {
  async.parallel({
    book_count: function (callback) {
      Book.count({}, callback);
    },
    book_instance_count: function(callback) {
        BookInstance.count({}, callback);
    },
    book_instance_available_count: function(callback) {
        BookInstance.count({status:'Available'}, callback);
    },
    author_count: function(callback) {
        Author.count({}, callback);
    },
    genre_count: function(callback) {
        Genre.count({}, callback);
    },
  }, function(err, results){
      res.render('index',{title: 'Local Library Home', error: err, data: results})
  });
};

exports.book_list = (req, res,next) => {
 Book.find({},'title author')
 .populate('author')
 .exec(function(err, list_books){
     if(err) {
         return next(err)
     }
     res.render('book_list', { title: 'Book List', book_list: list_books})
 })
};

exports.book_detail = (req, res, next) => {
  async.parallel({
    book: function(callback){
      Book.findById(req.params.id)
      .populate('author')
      .populate('genre')
      .exec(callback)
    },
    book_instance: function(callback){
       BookInstance.find({ 'book': req.params.id})
       .exec(callback)
    }
  },
  function(err, results){
    if(err){
        return next(err)
    }
    if(results.book == null){
        var err = new Error('Book not found');
        err.status = 404;
        return next(err);
    }
    res.render('book_detail', { title: 'Title', book:  results.book, book_instances: results.book_instance})
})
};

exports.book_create_get = (req, res) => {
  res.send("未实现：Book创建表单的 GET");
};

exports.book_create_post = (req, res) => {
  res.send("未实现：创建Book的 POST");
};

exports.book_delete_get = (req, res) => {
  res.send("未实现：Book删除表单的 GET");
};

exports.book_delete_post = (req, res) => {
  res.send("未实现：删除Book的 POST");
};

exports.book_update_get = (req, res, next) => {
  async.parallel({
    book: function(callback){
      Book.findById(req.params.id).populate('author').populate('genre').exce(callback);
    },
    authors: function(callback){
      Author.find(callback)
    },
    genres: function(callback){
      Genre.find(callback);
    }
  }),
  function(err, results){
    if(err) return next(err);
    if(!results.book){
      let err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }

    for (let all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
      const genre = results.genres[all_g_iter];
      for (let book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
        const bGenre = results.book.genre[book_g_iter];
        if(genre._id.toString() === bGenre._id.toString()){
          genre.checked = 'true';
        }
      }
    }
    res.render('book_form', { title: 'Update Book', authors: results.authors,genres: results.genres, book: results.book})
  }
};

// Handle book update on POST.
exports.book_update_post = [

  // Convert the genre to an array
  (req, res, next) => {
      if(!(req.body.genre instanceof Array)){
          if(typeof req.body.genre==='undefined')
          req.body.genre=[];
          else
          req.body.genre=new Array(req.body.genre);
      }
      next();
  },

  // Validate fields.
  body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  body('author', 'Author must not be empty.').isLength({ min: 1 }).trim(),
  body('summary', 'Summary must not be empty.').isLength({ min: 1 }).trim(),
  body('isbn', 'ISBN must not be empty').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('title').trim().escape(),
  sanitizeBody('author').trim().escape(),
  sanitizeBody('summary').trim().escape(),
  sanitizeBody('isbn').trim().escape(),
  sanitizeBody('genre.*').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped/trimmed data and old id.
      var book = new Book(
        { title: req.body.title,
          author: req.body.author,
          summary: req.body.summary,
          isbn: req.body.isbn,
          genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
          _id:req.params.id //This is required, or a new ID will be assigned!
         });

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/error messages.

          // Get all authors and genres for form.
          async.parallel({
              authors: function(callback) {
                  Author.find(callback);
              },
              genres: function(callback) {
                  Genre.find(callback);
              },
          }, function(err, results) {
              if (err) { return next(err); }

              // Mark our selected genres as checked.
              for (let i = 0; i < results.genres.length; i++) {
                  if (book.genre.indexOf(results.genres[i]._id) > -1) {
                      results.genres[i].checked='true';
                  }
              }
              res.render('book_form', { title: 'Update Book',authors:results.authors, genres:results.genres, book: book, errors: errors.array() });
          });
          return;
      }
      else {
          // Data from form is valid. Update the record.
          Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
              if (err) { return next(err); }
                 // Successful - redirect to book detail page.
                 res.redirect(thebook.url);
              });
      }
  }
];