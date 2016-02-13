/**
* @fileOverview Contains the route for hello world 
*
*/

var router = require("koa-router")();

router.get("/",function *(next){
	yield this.render('../views/index.jade');
	console.log("request recieved")
});

module.exports =router;