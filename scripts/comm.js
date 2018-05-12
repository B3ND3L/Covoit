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
        var obj = {
          event : "participations",
          user : cookies['userid'],
          date : (date.getFullYear()+"-"+date.getMonth().toString().padStart(2,'0')+"-"+date.getDate())
        };
        sendMsg(obj);
        $("#connexion").modal('hide');
      } else {
        $("#login").val('');
        $("#password").val('');
      }
      break;
    case 'participations':
      console.log(data.Datas);
      participations = data.Datas;
      for(p of participations){
        p.date = new Date(p.date);
        console.log("js = " + date.getTime());
        console.log("sql = " + p.date.getTime());
        if(date.getTime() === p.date.getTime()){
          flagComm = false;
          if(p.participe){
            $("#in_"+p.periode).click();
          }else{
            $("#out_"+p.periode).click();
          }
          flagComm = true;
        }
      }
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
