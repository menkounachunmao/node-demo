/*
 * @Author: xx
 * @Date: 2021-06-03 14:35:25
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 15:29:36
 * @FilePath: /helloworld/models/book.js
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: { type: String, required:true},
    isbn: { type: String, required: true},
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre'}]
})

// 虚拟属性：藏书url
BookSchema.virtual('url')
.get(function(){
    return '/catalog/book/' + this._id;
})

module.exports = mongoose.model('Book', BookSchema)