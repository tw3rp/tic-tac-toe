var mongoose = require("mongoose");

var conn = mongoose.connection;
var uri = "mongodb://localhost:27017/tictactoe";

conn.on("error",console.error.bind(console,"connection error:"));
conn.once("open", function(callback){
  console.log("connected to "+ uri);
});

mongoose.connect(uri);
module.exports = conn;

