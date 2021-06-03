/*
 * @Author: xx
 * @Date: 2021-06-03 09:44:52
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 10:49:33
 * @FilePath: /node/helloworld/routes/users.js
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/cool/', function(req, res, next) {
  res.send('cool');
});

module.exports = router;
