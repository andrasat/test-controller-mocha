const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memoSchema = new Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
})

const Memo = mongoose.model('Memo', memoSchema)
module.exports = Memo