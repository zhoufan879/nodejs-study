var mongoose = require("mongoose");

mongoose.connect("mongodb://zhoufan879:123456@127.0.0.1:27017/test");

exports.mongoose = mongoose;