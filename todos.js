var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  description:String,
  status:String,
  id:Number


});

module.exports = mongoose.model('todos', blogSchema);
