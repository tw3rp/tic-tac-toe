/**
* @fileOverview entry point for the application 
*
*/
var koa = require("koa");
var app= koa();
var log4js = require("log4js");
log4js.configure(require("./config/logging.js"));
var views = require('koa-views');
var socketio  = require('socket.io');
//setting up static directory
app.use(require('koa-static')(__dirname + '/public'));

/** Setting up koa jade templating */
app.use(views('views', {
root: __dirname + '/views',
default: 'jade'
}));

/** setting up database*/
var conn = require('./config/db.js');
//koa router 
var env = process.env.NODE_ENV || 'development';

var router =require("./routes/route");

app
	.use(router.routes())
	.use(router.allowedMethods());


//var http = require('http').Server(app.callback());
//var io = require('socket.io')(http);


var server    = app.listen(8080);
var io        = require('socket.io').listen(server);

require("./sockets/connected")(io,conn);


