/*
 * @Author: xx
 * @Date: 2021-06-03 16:36:09
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-07 11:52:12
 * @FilePath: /helloworld/controllers/genreController.js
 */
const Genre = require('../models/genre');
const async = require('async');
const Book = require('../models/book')

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

exports.genre_detail = (req, res, next) => { 
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
            .exec(callback)
        },

        genre_books: function(callback){
             Book.find({ 'genre': req.params.id})
             .exec(callback)
        }
    }, 
    function(err, results){
            if(err){
                return next(err)
            }
            if(results.genre == null){
                var err = new Error('Genre not found');
                err.status = 404;
                return next(err);
            }
            res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books:results.genre_books})
    })
 };

exports.genre_create_get = (req, res) => { res.send('未实现：genre创建表单的 GET'); };

exports.genre_create_post = (req, res) => { res.send('未实现：创建genre的 POST'); };

exports.genre_delete_get = (req, res) => { res.send('未实现：genre删除表单的 GET'); };

exports.genre_delete_post = (req, res) => { res.send('未实现：删除genre的 POST'); };

exports.genre_update_get = (req, res) => { res.send('未实现：genre更新表单的 GET'); };

exports.genre_update_post = (req, res) => { res.send('未实现：更新genre的 POST'); };