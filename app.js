/**
* @fileOverview entry point for the application 
*
*/
var koa = require("koa");
var app= koa();
var log4js = require("log4js");
var views = require('koa-views');
log4js.configure(require("./config/logging.js"));
//koa router 
var env = process.env.NODE_ENV || 'development';

var router =require("./routes/hello");

app
	.use(router.routes())
	.use(router.allowedMethods());




app.listen(8080);
