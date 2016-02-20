var mongoose = require("mongoose");

var createModel = function(conn){
var historySchema = new mongoose.Schema({
  _id: { type:String},
  name: { type:String},
  created: {type: Date},
  updated: {type: Date},
  data:{type:String},
  r1c1:{type:String}, 
  r1c2:{type:String}, 
  r1c3:{type:String},
  r2c1:{type:String}, 
  r2c2:{type:String}, 
  r2c3:{type:String},
  r3c1:{type:String}, 
  r3c2:{type:String}, 
  r3c3:{type:String}
},{strict: false });

historySchema.pre("update", function(next){
  /*now = new Date();
  this.updated = now;
  if(!this.created){
    this.created = now;
  }
  next();*/
  this.update({},{ $set: { updated: new Date() } });
  next();
});

var History = conn.model("History",historySchema);
return History
}
module.exports = createModel; 

