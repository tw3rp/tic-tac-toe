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

var on_connected = function(io){
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
    		console.log(player);	
    		socket.emit('connected_player', player);
  		});
  	console.log("Socket connected");
	});

}

module.exports = on_connected;