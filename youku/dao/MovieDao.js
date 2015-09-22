var mongodb = require("./db/mongodb.js");
var Movie = require("./model/Movie.js");


/**
 *  module.exports & exports, 作用都是向外暴露属性，提供外部访问
 *
 *  两者区别：
 *    .module.exports == exports. But, exports != module.exports
 *    .抽象的说，module.exports 是接口，exports 是类
 *         eg: module.exports = {...};  // 接口
 *             exports.xxx = ...;       // 具体实现类
 * 	  .module.exports 可以单独定义返回数据类型，exports 不可以；
 *    .exports 只能返回一个 object
 *
 *  如，
 *    module.exports = [];    // succ
 *    exports = [];           // error
 * 
 */
module.exports = {
	queryAll : function(callback) {
		Movie.find({}, callback);
	},

	queryById : function(id, callback) {
		console.log(id);
		Movie.findById( id, callback);
	},

	add : function(json, callback){
		var m = new Movie(json); 
		console.log("saveOrUpdate", m);
		m.save(callback);
	},

	remove : function(id, callback) {
		console.log(id);
		Movie.findByIdAndRemove(id, callback);
	},

	update : function(json, callback) {
		Movie.findByIdAndUpdate(json._id, json, callback);
	},

	test : function() {
		var db = mongodb.mongoose.connection;
		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", function(cb){
			console.log("MongoDB Connected Successfully!");
		});
	}
}