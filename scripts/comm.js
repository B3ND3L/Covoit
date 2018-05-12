//var ws = new WebSocket("ws://"+document.location.href.split('/')[2]+":3000");

var ws;

var buffer = [];

function sendMsg(obj){
  buffer.push(obj);
}

var p1 = new Promise(function(resolve, reject) {
  ws = new WebSocket("ws://localhost:3000");
});


ws.onmessage = function(event){
  console.log(event.data);
  var data = JSON.parse(event.data);
  switch(data.Event){
    case "connexion" :
      if(data.Status === 1){
        exp = new Date();
        exp.setDate(exp.getDay()+30);
        document.cookie = "userid="+data.idUser+"; expires="+exp.toUTCString()+"; path=/";;
        document.cookie = "username="+$("#login").val()+"; expires="+exp.toUTCString()+"; path=/";
        $("#connexion").modal('hide');
      } else {
        $("#login").val('');
        $("#password").val('');
      }
      break;
    case 'participations':
      console.log(data.Datas);
      participations = data.Datas;
      break;
    default : console.log("Unknown event");break;
  }
};

ws.onopen = function(event){

  sendMsg = function(object){ws.send(JSON.stringify(object))};

  for(obj of buffer){
    sendMsg(obj);
  }

  buffer = [];
};
