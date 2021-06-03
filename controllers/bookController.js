/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:30
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 16:48:37
 * @FilePath: /helloworld/controllers/bookController.js
 */

const Book = require('../models/book');

exports.index = (req, res) => { res.send('未实现：站点首页'); }

exports.book_list = (req, res) => { res.send('未实现：Book列表'); };

exports.book_detail = (req, res) => { res.send('未实现：Book详细信息：' + req.params.id); };

exports.book_create_get = (req, res) => { res.send('未实现：Book创建表单的 GET'); };

exports.book_create_post = (req, res) => { res.send('未实现：创建Book的 POST'); };

exports.book_delete_get = (req, res) => { res.send('未实现：Book删除表单的 GET'); };

exports.book_delete_post = (req, res) => { res.send('未实现：删除Book的 POST'); };

exports.book_update_get = (req, res) => { res.send('未实现：Book更新表单的 GET'); };

exports.book_update_post = (req, res) => { res.send('未实现：更新Book的 POST'); };