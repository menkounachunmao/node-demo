/*
 * @Author: xx
 * @Date: 2021-06-03 14:35:18
 * @LastEditors: 青峰
 * @LastEditTime: 2021-06-03 14:51:18
 * @FilePath: /helloworld/models/author.js
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// 虚拟属性：作者全名
AuthorSchema.virtual('name').get(function(){
    return this.family_name+ ', ' + this.first_name;
})

// 虚拟属性：作者寿命
AuthorSchema.virtual('lifespan')
.get(function(){
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
})

// 虚拟属性：作者url
AuthorSchema.virtual('url')
.get(function(){
    return '/catalog/author/' + this._id;
})

module.exports = mongoose.model('Author', AuthorSchema)