var date;
var participations = [];
var cookies = [];
tmp = document.cookie;
tmp = tmp.split('; ');
for(var c of tmp){
  var c = c.split('=');
  cookies[c[0]] = c[1];
}


date = new Date();
refreshDate();

document.addEventListener("DOMContentLoaded", function(event) {
  if(cookies['username'] === undefined){
    $("#connexion").modal({
      keyboard: false,
      backdrop : 'static'
    });
  } else {
    var obj = {
      event : "participations",
      user : cookies['userid'],
      date : (date.getFullYear()+"-"+date.getMonth().toString().padStart(2,'0')+"-"+date.getDate())
    };
    sendMsg(obj);
  }
});

function initMaps() {
  var chanzy = {lat: 49.484892, lng: 0.141091};
  var batB = {lat: 49.470148, lng: 0.266946};

  var mapA = new google.maps.Map(document.getElementById('mapA'), {
    center: chanzy,
    zoom: 7,
    fullscreenControl : false,
    mapTypeControl : false,
    scaleControl : false,
    streetViewControl : false,
    zoomControl : false
  });

  var mapR = new google.maps.Map(document.getElementById('mapR'), {
    center: batB,
    zoom: 7,
    fullscreenControl : false,
    mapTypeControl : false,
    scaleControl : false,
    streetViewControl : false,
    zoomControl : false
  });

  var directionsDisplayA = new google.maps.DirectionsRenderer({
    map: mapA
  });
  var directionsDisplayR = new google.maps.DirectionsRenderer({
    map: mapR
  });

  var requestA = {
    origin: chanzy,
    destination: batB,
    travelMode : 'DRIVING',
  };
  var requestR = {
    origin: batB,
    destination: chanzy,
    travelMode : 'DRIVING',
  };
  var directionsService = new google.maps.DirectionsService;

  directionsService.route(requestA, function(response, status) {
    if (status == 'OK') {
      directionsDisplayA.setDirections(response);
    }
  });
  directionsService.route(requestR, function(response, status) {
    if (status == 'OK') {
      directionsDisplayR.setDirections(response);
    }
  });
}
