var mongodb = require("../db/mongodb.js");
var Objectid = mongodb.mongoose.Schema.Types.ObjectId;

var movieSchema = mongodb.mongoose.Schema({
	id : Objectid,
	title : String,
	subtitle : String,
	goto : String,
	img : String,
	name : String,
	director : String,
	country : String,
	language : String,
	date : String,
	desc : String
},{collection : "movie"});

module.exports = movieSchema;