var mongodb = require("../db/mongodb.js");

var movieSchema = mongodb.mongoose.Schema({
	id : String,
	title : String,
	subtitle : String,
	goto : String,
	img : String
},{collection : "movie"});

module.exports = movieSchema;