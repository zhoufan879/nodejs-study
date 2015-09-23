var express = require("express");
var logger = require('morgan');
var init = require("./config/init.js");
var router = require("./router/router.js");
var app = express();
var port = 1377;

init(app, express);
router(app);
app.listen(port);

console.log("Youku Server running at http://127.0.0.1:" + port);