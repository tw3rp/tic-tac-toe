/**
* @fileOverview Contains the route for hello world 
*
*/

var router = require("koa-router")();

module.exports = router.get("/",function *(next){
	this.body="hello";
	console.log("request recieved")
});
