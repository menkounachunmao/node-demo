/*
 * @Author: xx
 * @Date: 2021-06-03 09:44:52
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 17:53:08
 * @FilePath: /helloworld/routes/index.js
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/catalog')
  res.render('index', { title: 'Express' });
});

module.exports = router;
