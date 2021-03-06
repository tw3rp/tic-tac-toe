var initial_data = {
  'r1c1':'', 
  'r1c2':'', 
  'r1c3':'',
  'r2c1':'', 
  'r2c2':'', 
  'r2c3':'',
  'r3c1':'', 
  'r3c2':'', 
  'r3c3':''
}

var xo= "x"
var other_player = false;
var players= [];
var i = 0;

function saveToDb(data,History,id){
	console.log("Saving to Database >>>>>>>>>>>>>>>>>>>>>>>",data)
	History.update({_id:id},{$set:{_id:id},$set:data},{multi:true,upsert:true},function(err,res){
		if(err) 
			{
				console.log(err);
			}
		else{
			console.log(res);
		}
	});
}

var on_connected = function(io,conn){
  var History =  require("../models/history")(conn);	
  io.on('connection', function(socket)
	{		
			socket.on('client_connected', function(player)
  		{
    		player.id = socket.id;
    		player.mark = xo;

    		if(xo="x" && other_player == false){
    			xo="o";
    			other_player = true;
    		}
    		else{
    			xo="spectator"
    		}
				players[i] = player;
				i++;
    		console.log(players);	
    		socket.emit('connected_player', player);
				io.sockets.emit('load',players);
  		});
  	console.log("Socket connected");
		socket.on('moved', function(marked)
  	{
			var n = 0;
			marked = marked.replace("#",'');
			while (n < players.length)
				{
					if (players[n].id == socket.id)
					{
						console.log(players[n].mark);
						initial_data[marked] = players[n].mark;
					}
					n++;
				}
    
    		console.log(initial_data);
    		//save to the database
    		//History.update({_id:socket.id},)
    		saveToDb(initial_data,History,socket.id);	
	    // Update clients with the move
    	io.sockets.emit('mark', marked);

    	//to check if the game is finished

    	if( 
    			//all horizontal checks
    			(initial_data["r1c1"] == initial_data["r1c2"] && initial_data["r1c2"] == initial_data["r1c3"] && initial_data["r1c1"] != "")||
    			(initial_data["r2c1"] == initial_data["r2c2"] && initial_data["r2c2"] == initial_data["r2c3"] && initial_data["r2c1"] != "")||
    			(initial_data["r3c1"] == initial_data["r3c2"] && initial_data["r3c2"] == initial_data["r3c3"] && initial_data["r3c1"] != "")||
    			
    			//all vertical vertical checks
    			(initial_data["r1c1"] == initial_data["r2c1"] && initial_data["r2c1"] == initial_data["r3c1"] && initial_data["r1c1"] != "")||
    			(initial_data["r1c2"] == initial_data["r2c2"] && initial_data["r2c2"] == initial_data["r3c2"] && initial_data["r1c2"] != "")||
    			(initial_data["r1c3"] == initial_data["r2c2"] && initial_data["r2c3"] == initial_data["r3c3"] && initial_data["r1c3"] != "")||
    			//diagnal check
    			(initial_data["r1c1"] == initial_data["r2c2"] && initial_data["r2c2"] == initial_data["r3c3"] && initial_data["r1c1"] != "")||
  				(initial_data["r3c1"] == initial_data["r2c2"] && initial_data["r2c2"] == initial_data["r1c3"] && initial_data["r3c1"] != "")
  		
  				){
    			console.log(initial_data)
    			io.sockets.emit('gameover', xo);
    		};
  		});

		socket.on('disconnect', function()
   {
     var j = 0;
     var n = 0;
     var tmp = [];
     console.log("disconnected")
     while (n < players.length)
     {	
       if (players[j].id == socket.id)
       {
         if(players[j].mark == 'o')
         {
           xo = 'o';
           other_player = false;
         }
         if(players[j].mark == 'x')
         {
           xo = 'x';
         }
     	   n++;
     	 }
     	 
     	 if (n < players.length)
     	 {
     	   tmp[j] = players[n];
     	   j++;
     	   n++;
     	  }
     	}
     	
     	players = tmp;
     	i = j;
     	initial_data = {
  			'r1c1':'', 
			  'r1c2':'', 
			  'r1c3':'',
			  'r2c1':'', 
			  'r2c2':'', 
			  'r2c3':'',
			  'r3c1':'', 
			  'r3c2':'', 
			  'r3c3':''
			}
      io.sockets.emit('load', players);
   	});
	});

}

module.exports = on_connected;
