/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:52
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 16:35:52
 * @FilePath: /helloworld/controllers/bookinstanceController.js
 */

const Bookinstance = require('../models/bookinstance');


exports.bookinstance_list = (req, res) => { res.send('未实现：bookinstance列表'); };

exports.bookinstance_detail = (req, res) => { res.send('未实现：bookinstance详细信息：' + req.params.id); };

exports.bookinstance_create_get = (req, res) => { res.send('未实现：bookinstance创建表单的 GET'); };

exports.bookinstance_create_post = (req, res) => { res.send('未实现：创建bookinstance的 POST'); };

exports.bookinstance_delete_get = (req, res) => { res.send('未实现：bookinstance删除表单的 GET'); };

exports.bookinstance_delete_post = (req, res) => { res.send('未实现：删除bookinstance的 POST'); };

exports.bookinstance_update_get = (req, res) => { res.send('未实现：bookinstance更新表单的 GET'); };

exports.bookinstance_update_post = (req, res) => { res.send('未实现：更新bookinstance的 POST'); };