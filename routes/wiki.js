/*
 * @Author: xx
 * @Date: 2021-06-03 15:50:11
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 16:01:28
 * @FilePath: /helloworld/routes/wiki.js
 */

const express = require("express");

const router = express.Router();

// 主页路由
router.get('/', (req, res)=>{
    res.send('主页')
})

router.get('/about',(req, res)=>{
    res.send('关于')
})

router.get('/test/:id/books/:bookId',(req, res)=>{
    res.send(`id:${req.params.id};bookId:${req.params.bookId}`)
})


module.exports = router;