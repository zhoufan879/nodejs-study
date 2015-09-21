var mongodb = require("../db/mongodb.js");
var movieSchema = require("../schema/movie.js");

module.exports = mongodb.mongoose.model("movie", movieSchema);