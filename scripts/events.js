var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

var flagComm = true;

var gesuredZone = document.body; //document.getElementById('gesuredZone');

gesuredZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gesuredZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
}, false);

$(".btn-dispo").click(function(event, arg){

  var tmp = $(this).prop('id').split('_');
  var dispo = tmp[0];
  var time = tmp[1];

  var update = $(this).data('update');

  $("#out_"+time).data('update',1);
  $("#in_"+time).data('update',1);

  if($(this).val() == '1'){
    $(this).removeClass('btn-'+((dispo==="out")?"danger":"success")).addClass('btn-outline-'+((dispo==="out")?"danger":"success"));
    $(this).val('0');
  } else {
    $(this).removeClass('btn-outline-'+((dispo==="out")?"danger":"success")).addClass('btn-'+((dispo==="out")?"danger":"success"));
    $(this).val('1');
  }
  if($("#"+(dispo==="out"?"in":"out")+"_"+time).hasClass('btn-'+(dispo==="out"?"success":"danger"))){
    $("#"+(dispo==="out"?"in":"out")+"_"+time).removeClass('btn-'+((dispo==="out")?"success":"danger")).addClass('btn-outline-'+((dispo==="out")?"success":"danger"));
    $("#"+(dispo==="out"?"in":"out")+"_"+time).val('0');
  }
  if(flagComm === true){
    var obj = {
      event : "click",
      dispo : (dispo=='in'?1:0),
      user : cookies['userid'],
      time : time,
      date : (date.getFullYear()+"-"+(date.getMonth()+1).toString().padStart(2,'0')+"-"+date.getDate()),
      update : update
    };
    sendMsg(obj);
  }
});

$("#connexionButton").click(function(){

  var password = $("#password").val();
  //HASH PASSWORD HERE
  password = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

  var obj = {
    event : "connexion",
    login : $("#login").val(),
    password : password
  };
  sendMsg(obj);
});



function handleGesure() {
    var swiped = 'swiped: ';

    var deltaX = window.innerWidth/10;
    var deltaY = window.innerHeight/10;
    var diffX = Math.abs(touchendX-touchstartX);
    var diffY = Math.abs(touchendY-touchstartY);

    console.log(diffX);
    console.log(diffY);

    if (touchendX+deltaX < touchstartX && diffX>(diffY)*3) {
        //console.log(swiped + 'right!');
        swipeDate(getNextDay());

    }
    if (touchendX-deltaX > touchstartX  && diffX>(diffY)*3) {
        //console.log(swiped + 'left!');
        swipeDate(getPrevDay());
    }
    /*if (touchendY < touchstartY) {
        alert(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        alert(swiped + 'left!');
    }*/
    if (touchendY == touchstartY) {
        //console.log('tap!');
    }
}

function getFullDate(){
    var weekday=new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");
    var monthname=new Array("Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre");

    return weekday[date.getDay()] + " " +date.getDate() + " " +monthname[date.getMonth()] + " " + date.getFullYear();
}

function getHeureFin(){
    return (date.getDay() == 3 || date.getDay() == 5)?'17H15':'17H45';
}

function getNextDay(){
    return (date.getDay() == 5)?3:1;
}

function getPrevDay(){
    return (date.getDay() == 1)?-3:-1;
}

function swipeDate(days){
    date.setDate(date.getDate() + days);
    refreshDate();
}

function refreshDate(){
    $("#date").text(getFullDate(date));
    $("#retour").text($("#retour").text().replace('???', getHeureFin(date)));
    $("#retour").text($("#retour").text().replace(/\d{2}H\d{2}/, getHeureFin(date)));
}
