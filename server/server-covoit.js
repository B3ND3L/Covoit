var express = require('express'),
	mysql = require('mysql')
const server = express();
const port = 3000;


//BDD covoiturage & bB9XbJkAPAWkNKfD

var mysql = mysql.createConnection({
  host: "localhost",
  user: "covoiturage",
  password: "bB9XbJkAPAWkNKfD",
  database: "covoiturage"
});

mysql.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

server.listen(port, function(){
	console.log('Listening on port '+port);
});



server.route('/participations')
		.get(function(req, res){

			/*
			
			sql = "SELECT periode, date, participe FROM Participations WHERE idUser="+data.user+" AND date >="+data.date;
			mysql.query(sql, function (err, result) {
				if (err) throw err;
				client.send('{"Event" : "participations", "Datas" : '+JSON.stringify(result)+'}');
			});
			*/
		}).post(function(req,res){

			/*
			sql = "INSERT INTO Participations (idUser, periode, date, participe) VALUES ("+data.user+",'"+data.time+"','"+data.date+"',"+data.dispo+")";
			mysql.query(sql, function (err, result) {
				if (err) throw err;
			});
			
			*/
		}).put(function(req,res){
			/*
			
			sql = "UPDATE Participations SET participe="+data.dispo+" WHERE idUser="+data.user+" AND periode='"+data.time+"' AND date='"+data.date+"'";
			mysql.query(sql, function (err, result) {
				if (err) throw err;
			});
			*/
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
					mysql.query(sql, function (err, result) {
						if (err) throw err;
					});
				break;
			case 'connexion' :

				sql = "SELECT * FROM Users WHERE nom='"+data.login+"' AND pass='"+data.password+"'";
				mysql.query(sql, function (err, result) {
					if (err) throw err;
					if(result[0] !== undefined){
						client.send('{"Status" : 1, "Event":"connexion", "idUser" : '+result[0].id+'}');
					} else {
						client.send('{"Status" : 0, "Event":"connexion"}');
					}
				});
				break;
			case 'participations' :

				
				break;
		}
  });
});
