/*
 * @Author: xx
 * @Date: 2021-06-03 16:36:09
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-04 17:21:46
 * @FilePath: /helloworld/controllers/genreController.js
 */
const Genre = require('../models/genre');


exports.genre_list = (req, res,next) => { 
    Genre.find()
    .sort([['name']])
    .exec(function(err,list_genre){
        if(err){
            return next(err)
        }
        res.render('genre_list',{ title: 'Genre List', genre_list:list_genre})
    })
 };

exports.genre_detail = (req, res) => { res.send('未实现：genre详细信息：' + req.params.id); };

exports.genre_create_get = (req, res) => { res.send('未实现：genre创建表单的 GET'); };

exports.genre_create_post = (req, res) => { res.send('未实现：创建genre的 POST'); };

exports.genre_delete_get = (req, res) => { res.send('未实现：genre删除表单的 GET'); };

exports.genre_delete_post = (req, res) => { res.send('未实现：删除genre的 POST'); };

exports.genre_update_get = (req, res) => { res.send('未实现：genre更新表单的 GET'); };

exports.genre_update_post = (req, res) => { res.send('未实现：更新genre的 POST'); };