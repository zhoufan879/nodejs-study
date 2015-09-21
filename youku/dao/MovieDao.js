var mongodb = require("./db/mongodb.js");
var Movie = require("./model/Movie.js");

module.exports = function(){
	this.queryAll = function(callback) {
		console.log(Movie);
		Movie.find({}, callback);
	};

	this.test = function() {
		var db = mongodb.mongoose.connection;
		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", function(cb){
			console.log("MongoDB Connected Successfully!");
		});
	};
}
