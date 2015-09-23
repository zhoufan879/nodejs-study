var MovieDao = require("../dao/MovieDao.js");
MovieDao.test();

// 路由
module.exports = function(app) {
	app.get("/", function(req, res) {
		MovieDao.queryAll(function(err, movies) {
			if (err) throw err;
			res.render("index", {
				title: "Youku 首页",
				movies: movies
			});
		});
	});

	app.get("/admin", function(req, res) {
		res.render("admin", {
			title: "后台管理系统"
		});
	});

	app.get("/admin/movie/list", function(req, res) {
		MovieDao.queryAll(function(err, movies) {
			if (err) throw err;
			res.render("movie/list", {
				title: "电影列表",
				movies: movies
			});
		});
	});

	app.get("/admin/movie/add", function(req, res) {
		console.log(req.query.id);
		if (req.query.id) {
			MovieDao.queryById(req.query.id, function(err, movie) {
				res.render("movie/add", {
					title: "录入新电影",
					m: movie
				});
			});
		} else {
			res.render("movie/add", {
				title: "录入新电影",
				m: {}
			});
		}
	});

	app.post("/admin/movie/add", function(req, res) {
		MovieDao.add(req.body, function(err) {
			if (err) throw err;

			console.log("add success");
			res.status(200).json({
				status: 200,
				info: "added"
			});
		});
	});

	app.delete("/admin/movie/:id", function(req, res) {
		var _id = req.params.id;
		MovieDao.remove(_id, function(err) {
			if (err) throw err;

			console.log("delete success");
			res.status(200).json({
				status: 200,
				info: "deleted"
			});
		});
	});

	app.put("/admin/movie", function(req, res) {
		console.log(req.body);
		MovieDao.update(req.body, function(err) {
			if (err) throw err;

			console.log("add success");
			res.status(200).json({
				status: 200,
				info: "updated"
			});
		});
	});

	app.route("/movie/:id")
		.get(function(req, res) {
			var id = req.params.id;
			var json_path = "./modal/" + id + ".json"; // ./modal/1001.json
			var json_movie = getJson(json_path);

			if (json_movie)
				res.render("detail", json_movie);
			else
				res.end("<h1>502 Error!</h1>");
		});


}