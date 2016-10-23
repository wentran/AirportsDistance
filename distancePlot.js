/**
 * PURPOSE: Display Google Maps on screen - powered by Google API
 */

function initialize(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong) {
  var myLatLongMap = new google.maps.LatLongMap((startAirportLong+arrivingDestination)/2, (startAirportLong+arrivingAirportLong)/2);
  var mapOptions = {
    zoom: 4,
    center: myLatLongMap,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

// Define the custom symbols. All symbols are defined via SVG path notation.
// They have varying stroke color, fill color, stroke weight,
// opacity and rotation properties.
  var symbolOne = {
    path: 'M -2,0 0,-2 2,0 0,2 z',
    strokeColor: '#F00',
    fillColor: '#F00',
    fillOpacity: 1
  };

  var symbolTwo = {
    path: 'M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0M -3,3 Q 0,5 3,3',
    strokeColor: '#00F',
    rotation: 45
  };

  var symbolThree = {
    path: 'M -2,-2 2,2 M 2,-2 -2,2',
    strokeColor: '#292',
    strokeWeight: 4
  };

// Create the polyline and add the symbols via the 'icons' property.

  var lineCoordinates = [
    new google.maps.LatLongMap(startAirportLong, startAirportLong),
    new google.maps.LatLongMap(arrivingAirportLat, arrivingAirportLong)
  ];

  var line = new google.maps.Polyline({
    path: lineCoordinates,
    icons: [
      {
        icon: symbolOne,
        offset: '0%'
      }, {
        icon: symbolTwo,
        offset: '50%'
      }, {
        icon: symbolThree,
        offset: '100%'
      }
    ],
    map: map
  });

}

/**
 * FILE NAME: GetDistance.js
 * PURPOSE: Validate and get distance between two airport inputs.
 * SIDE EFFECT: Initializes Google Map after successfully displaying distance.
 */

function openGoogleMaps (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong){
  initialize(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong)
}

function getArrivingAirportLongLat (arrivingAirport, key, startAirportLat, startAirportLong) {
  $.ajax({
    type: 'GET',
    url : "https://airport.api.aero/airport/" + arrivingAirport + "?user_key=" + key,
    dataType : "jsonp",
    success : function(parsed_json) {
      arrivingAirportLat = parsed_json.airports[0].lat;
      arrivingAirportLong = parsed_json.airports[0].lng;
       
      openGoogleMaps (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong);
     }
  });
}

function getStartingAirportLongLat (startAirport, arrivingAirport, key) {
  $.ajax({
    type: 'GET',
    url : "https://airport.api.aero/airport/" + startAirport + "?user_key=" + key,
    dataType : "jsonp",
    success : function(parsed_json) {
      startAirportLat = parsed_json.airports[0].lat;
      startAirportLong = parsed_json.airports[0].lng;
      
      getArrivingAirportLongLat(arrivingAirport, key, startAirportLat, startAirportLong);
    }
  });
}




$(document).ready(function(){
  $("#reset").click(function(){
    var startAirport = $("#startAirport").val();
    var arrivingAirport = $("#arrivingAirport").val();
    var key = '5893b60d8bde3259e625ced3de9ef69f';

    $.ajax({
      type: 'GET',
      url : "https://airport.api.aero/airport/" + startAirport + "?user_key=" + key,
      dataType : "jsonp",
      success : function(parsed_json) {
        startAirportLat = parsed_json.airports[0].lat;
        startAirportLong = parsed_json.airports[0].lng;
        console.log(startAirportLat,startAirportLong)
        // getArrivingAirportLongLat(arrivingAirport, key, startAirportLat, startAirportLong);
      }
    });
    // get arriving airport longLat
    $.ajax({
      type: 'GET',
      url : "https://airport.api.aero/airport/" + arrivingAirport + "?user_key=" + key,
      dataType : "jsonp",
      success : function(parsed_json) {
        arrivingAirportLat = parsed_json.airports[0].lat;
        arrivingAirportLong = parsed_json.airports[0].lng;
         
        // openGoogleMaps (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong);
       }

    });
  
  });
});
