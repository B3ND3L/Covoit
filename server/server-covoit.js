var http = require('http'),
	WebSocket = require('ws'),
	WebSocketServer = WebSocket.Server;

var server = http.createServer();
server.listen('3000', '0.0.0.0', function() {
  console.log('Listening on ' + server.address().address + ':' + server.address().port);
});

var wss = new WebSocketServer({
	server: server
});

wss.on('connection', function(client) {
	client.on('message', function(message) {
    try {
      var data = JSON.parse(message);
    } catch(e){
      console.error('Something wrong append');
      data.type = 'unmanaged';
    }
    console.log(data);
  });
});
