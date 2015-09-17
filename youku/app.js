var express = require("express");
var path = require("path");
var app = express();

var port = 1377;

// 设置视图的根目录 ./views
app.set("views", "./views/pages");

// 设置默认模版引擎 Jade
app.set("view engine", "jade");

// 设置静态资源 
app.use(express.static(path.join(__dirname, "static")));

//app.use(express.bodyParser());

// 路由
app.get("/", function(req, res){
	res.render("index", {
		title : "Youku 首页"
	});
});

app.listen(port);

console.log("Youku Server running at http://127.0.0.1:1377");
