/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:30
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-04 15:01:05
 * @FilePath: /helloworld/controllers/bookController.js
 */

const Book = require("../models/book");
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

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

exports.book_detail = (req, res) => {
  res.send("未实现：Book详细信息：" + req.params.id);
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

exports.book_update_get = (req, res) => {
  res.send("未实现：Book更新表单的 GET");
};

exports.book_update_post = (req, res) => {
  res.send("未实现：更新Book的 POST");
};
