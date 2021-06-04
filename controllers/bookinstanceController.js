/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:52
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-04 16:44:17
 * @FilePath: /helloworld/controllers/bookinstanceController.js
 */

const BookInstance = require('../models/bookinstance');


exports.bookinstance_list = function(req, res, next) {
    BookInstance.find()
      .populate('book')
      .exec(function (err, list_bookinstances) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
      });
  
  };

exports.bookinstance_detail = (req, res) => { res.send('未实现：bookinstance详细信息：' + req.params.id); };

exports.bookinstance_create_get = (req, res) => { res.send('未实现：bookinstance创建表单的 GET'); };

exports.bookinstance_create_post = (req, res) => { res.send('未实现：创建bookinstance的 POST'); };

exports.bookinstance_delete_get = (req, res) => { res.send('未实现：bookinstance删除表单的 GET'); };

exports.bookinstance_delete_post = (req, res) => { res.send('未实现：删除bookinstance的 POST'); };

exports.bookinstance_update_get = (req, res) => { res.send('未实现：bookinstance更新表单的 GET'); };

exports.bookinstance_update_post = (req, res) => { res.send('未实现：更新bookinstance的 POST'); };