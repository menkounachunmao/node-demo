/*
 * @Author: xx
 * @Date: 2021-06-03 16:35:08
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-11 16:23:03
 * @FilePath: /helloworld/controllers/authorController.js
 */

const { default: async, retry } = require('async');
const { query } = require('express');
const { body, validationResult, sanitizeBody } = require('express-validator');
const Author = require('../models/author');
const Book = require('../models/book');
const moment = require('moment');
// 显示完整的作者列表
exports.author_list = (req, res, next) => { 
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_author){
        if(err){
            return next(err)
        }
        res.render('author_list', { title: 'Author List', author_list: list_author})
    })
 };

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res, next) => { 
    async.parallel({
        author: function(callback) {
            Author.findById( req.params.id )
            .exec(callback)
        },
        author_books: function(callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
            .exec(callback)
        }
    },
    function(err, results){
        if(err) {
            return next(err);
        }
        if(results.author==null){
            var err = new Error('Author not found');
            err.status = 404;
            return next(status)
        }
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.author_books})
    })
 };
 
// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => { 
    res.render('author_form', { title: 'Create Author'});
 };

// 由 POST 处理作者创建操作
exports.author_create_post =[
    body('first_name').isLength({ min:1 }).trim().withMessage('First name must be specified. ')
    .isAlphanumeric().withMessage('First name ha non-alphanumeric characters. '),
    body('family_name').isLength({ min:1 }).trim().withMessage('Family name must be specified. ')
    .isAlphanumeric().withMessage('Family name ha non-alphanumeric characters. '),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true}).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true}).isISO8601(),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('author_form',{ title: 'Create Author', author: req.body, errors: errors.array()});
            return;
        }
        let author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        })

        author.save(function(err){
            if(err){
                return next(err);
            }
            res.redirect(author.url)
        })
    }
];

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res, next) => { 
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback)
        },
        author_books: function(callback){
            Book.find({'author': req.params.id}).exec(callback)
        }
    },
    function(err, results){
        if(err){
            return next(err)
        }
        if(results.author === null){
            res.redirect('/catalog/authors')
        }
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.author_books})
    })
 };

// Handle Author delete on POST.
exports.author_delete_post = function(req, res, next) {

    async.parallel({
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        console.log(results.authors_books)
        if (results.authors_books?.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/authors')
            })
        }
    });
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res, next) => { 
    Author.findById(req.params.id)
    // 修改为javascript对象
    .lean()
    .exec(function(err, author_detail){
        author_detail.date_of_birth = moment(author_detail.date_of_birth).format('YYYY-MM-DD');
        author_detail.date_of_death = moment(author_detail.date_of_death).format('YYYY-MM-DD');
        res.render('author_form', { title: 'Update Author', author: author_detail,})
    })
 };

// 由 POST 处理作者更新操作
exports.author_update_post = [
    body('first_name').isLength({ min:1 }).trim().withMessage('First name must be specified. ')
    .isAlphanumeric().withMessage('First name ha non-alphanumeric characters. '),
    body('family_name').isLength({ min:1 }).trim().withMessage('Family name must be specified. ')
    .isAlphanumeric().withMessage('Family name ha non-alphanumeric characters. '),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true}).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true}).isISO8601(),

    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('author_form',{ title: 'Create Author', author: req.body, errors: errors.array()});
            return;
        }
        let author = new Author({
            _id: req.params.id,
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        })
        Author.findByIdAndUpdate(req.params.id,author,{},function(err){
            if(err){
                return next(err);
            }
            res.redirect(author.url)
        })
    }
];