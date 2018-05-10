var http = require('http'),
	mysql = require('mysql'),
	WebSocket = require('ws'),
	WebSocketServer = WebSocket.Server;

var server = http.createServer();
server.listen('3000', '0.0.0.0', function() {
  console.log('Listening on ' + server.address().address + ':' + server.address().port);
});

//BDD covoiturage & bB9XbJkAPAWkNKfD

var con = mysql.createConnection({
  host: "localhost",
  user: "covoiturage",
  password: "bB9XbJkAPAWkNKfD",
  database: "covoiturage"
});

var wss = new WebSocketServer({
	server: server
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

wss.on('connection', function(client) {
	client.on('message', function(message) {
    try {
      var data = JSON.parse(message);
    } catch(e){
      console.error('Something wrong append');
      data.type = 'unmanaged';
			return 0;
    }
    console.log(data);
	  var sql = "SELECT * FROM Users";
	  con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log(result);
	  });
  });
});
