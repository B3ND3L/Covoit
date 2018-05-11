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


		switch(data.event){
			case 'click' :
					var sql = '';
					if(data.update === 1){
						sql = "UPDATE Participations SET participe="+data.dispo+" WHERE idUser=1 AND periode='"+data.time+"' AND date='"+data.date+"'";
					} else {
						sql = "INSERT INTO Participations (idUser, periode, date, participe) VALUES (1,'"+data.time+"','"+data.date+"',"+data.dispo+")";
					}
					con.query(sql, function (err, result) {
						if (err) throw err;
						console.log(result);
					});
				break;
			case 'connexion' : 
				console.log('connexion faite');
				client.send('{"Reponse" : "OK"}')
				break;
		}
  });
});
