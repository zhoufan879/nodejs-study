var mongoose = require("mongoose");

mongoose.connect("mongodb://zhoufan879:123456@127.0.0.1:27017/test");

// 开发环境 
var env = process.env.config_env;
if( env === "dev" ){ 	
	mongoose.set("debug", true);
}

exports.mongoose = mongoose;