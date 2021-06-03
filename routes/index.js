/*
 * @Author: xx
 * @Date: 2021-06-03 09:44:52
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 17:14:23
 * @FilePath: /helloworld/routes/index.js
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog')
});

module.exports = router;
