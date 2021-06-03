/*
 * @Author: xx
 * @Date: 2021-06-03 14:35:49
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 15:09:58
 * @FilePath: /helloworld/models/genre.js
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name:{type: String, required: true, max: 100, min: 1}
})

GenreSchema.virtual('url')
.get(function(){
        return '/catalog/genre/' + this._id;
})

module.exports = mongoose.model('Genre', GenreSchema)