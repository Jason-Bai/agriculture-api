/**
 * Created by antianlu on 16/9/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  user_id: Schema.ObjectId,//发布人
  title: {type: String, index: 1},
  content: String,//内容
  desc: String,//简述
  category_id: Schema.ObjectId,
  star: Number,//星级
  create_at: {type: Date, default: Date.now},//创建时间
  modify_at: {type: Date, default: Date.now},//修改时间
  status: Number,//发布状态
}, {
  versionKey: false
});

PostSchema.query.byTile = function (title) {
  return this.find({title: new RegExp(title, 'i')});
};

module.exports = mongoose.model('Posts', PostSchema);