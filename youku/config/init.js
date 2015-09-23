var path = require("path");
var bodyParse = require("body-parser");

module.exports = function(app, express){
	// 设置视图的根目录 ./views
	app.set("views", "./views/pages");

	// 设置默认模版引擎 Jade
	app.set("view engine", "jade");

	// 解析 application/x-www-form-urlencoded 
	app.use(bodyParse.urlencoded({ extended: true }));
	// 解析 application/json
	app.use(bodyParse.json());

	// 设置静态资源 
	// app.use(express.static(path.join(__dirname, "bower_components")));
	app.use(express.static(path.join(__dirname, "../public")));
	// console.log(path.join(__dirname, "public"));				// e:\study\nodejs\project\nodejs-study\youku\public

	// 环境变量
	var env = process.env.config_env;

	// 开发环境 
	if( env === "dev" ){
		app.set("showStackError", true);
		app.use(logger(":method :url :status :response-time ms - :res[content-length]"));
		app.locals.pretty = true;
	}

}