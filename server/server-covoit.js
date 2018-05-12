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
						sql = "UPDATE Participations SET participe="+data.dispo+" WHERE idUser="+data.user+" AND periode='"+data.time+"' AND date='"+data.date+"'";
					} else {
						sql = "INSERT INTO Participations (idUser, periode, date, participe) VALUES ("+data.user+",'"+data.time+"','"+data.date+"',"+data.dispo+")";
					}
					con.query(sql, function (err, result) {
						if (err) throw err;
					});
				break;
			case 'connexion' :

				sql = "SELECT * FROM Users WHERE nom='"+data.login+"' AND pass='"+data.password+"'";
				con.query(sql, function (err, result) {
					if (err) throw err;
					if(result[0] !== undefined){
						client.send('{"Status" : 1, "Event":"connexion", "idUser" : '+result[0].id+'}');
					} else {
						client.send('{"Status" : 0, "Event":"connexion"}');
					}
				});
				break;
			case 'participations' :

				sql = "SELECT periode, date, participe FROM Participations WHERE idUser="+data.user+" AND date >="+data.date;
				con.query(sql, function (err, result) {
					if (err) throw err;
					client.send('{"Event" : "participations", "Datas" : '+JSON.stringify(result)+'}');
				});
				break;
		}
  });
});
