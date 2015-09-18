var express = require("express");
var path = require("path");
var app = express();

var port = 1377;

var json_movies = require("./modal/movies.json");

// 设置视图的根目录 ./views
app.set("views", "./views/pages");

// 设置默认模版引擎 Jade
app.set("view engine", "jade");

// 设置静态资源 
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, "public"));				// e:\study\nodejs\project\nodejs-study\youku\public

//app.use(express.bodyParser());

// 路由
app.get("/", function(req, res){
	res.render("index", {
		title : "Youku 首页",
		movies : json_movies
	});
});

app.route("/movie/*")
	.get(function(req, res) {
		var id = req.params["0"];
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
