var express = require("express");
var bodyParse = require("body-parser");
var path = require("path");
var app = express();

var port = 1377;

var MovieDao = require("./dao/MovieDao.js");
MovieDao.test();

// var json_movies = require("./modal/movies.json");

// 设置视图的根目录 ./views
app.set("views", "./views/pages");

// 设置默认模版引擎 Jade
app.set("view engine", "jade");

// 解析 application/x-www-form-urlencoded 
app.use(bodyParse.urlencoded({ extended: true }));
// 解析 application/json
app.use(bodyParse.json());

// 设置静态资源 
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));				// e:\study\nodejs\project\nodejs-study\youku\public

// 路由
app.get("/", function(req, res){
	res.render("index", {
		title : "Youku 首页",
		movies : json_movies
	});
});

app.get("/admin", function(req, res){
	res.render("admin", {
		title : "后台管理系统"
	});
});

app.get("/admin/movie/list", function(req, res){
	MovieDao.queryAll(function(err, movies){
		if(err) throw err;
		res.render("movie/list", {
			title : "电影列表",
			movies : movies
		});
	});
});

app.get("/admin/movie/add", function(req, res){
	res.render("movie/add", {
		title : "录入新电影"
	});
});

app.post("/admin/movie/add", function(req, res){
	console.log(req.is("html"));
	console.log(req.is("json"));
	//console.log(req);
	console.log(req.get("content-type"));
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);

	var json = {

	};
	// MovieDao.add(json, function(err){
	// 	if(err) throw err;

	// 	console.log("add success");
	// 	res.status(200).json({
	// 		status : 200,
	// 		data : "added"
	// 	});
	// });	
});

app.route("/movie/:id")
	.get(function(req, res) {
		var id = req.params.id;
		var json_path = "./modal/" + id + ".json";			// ./modal/1001.json
		var json_movie = getJson(json_path);

		if(json_movie)
			res.render("detail", json_movie);
		else 
			res.end("<h1>502 Error!</h1>");
	});

app.listen(port);

console.log("Youku Server running at http://127.0.0.1:1377");

function getJson(json_path){
	try{
		var json = require(json_path);
		return json;
	}catch(e){
		console.error("获取JSON文件失败", e);
		return undefined;
	}
	return undefined;
}
