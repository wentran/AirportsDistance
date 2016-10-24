/**
Display Google Map on screen - utilized Google Map API
 */

function initialize(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong) {
  var centerOption = new google.maps.LatLng((startAirportLat+arrivingAirportLat)/2, (startAirportLong+arrivingAirportLong)/2);
  var mapOptions = {
    zoom: 4,
    center: centerOption,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

// Define the custom symbols. All symbols are defined via SVG path notation.
// They have varying stroke color, fill color, stroke weight,
// opacity and rotation properties.
  var startAirportMarker = {
           path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
           fillColor: '#FF0000',
           fillOpacity: .6,
           anchor: new google.maps.Point(0,0),
           strokeWeight: 0,
           scale: 0.25

  }
  var arrivingAirportMarker = {
           path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
           fillColor: '#FF0000',
           fillOpacity: .6,
           anchor: new google.maps.Point(0,0),
           strokeWeight: 0,
           scale: 0.5


  }
// Create the polyline and add the symbols via the 'icons' property.

  var lineCoordinates = [
    new google.maps.LatLng(startAirportLat, startAirportLong),
    new google.maps.LatLng(arrivingAirportLat, arrivingAirportLong)
  ];

  var line = new google.maps.Polyline({
    path: lineCoordinates,
    icons: [
      {
        icon: startAirportMarker,
        offset: '0%'
      },  
      {
        icon: arrivingAirportMarker,
        offset: '100%'
      }
    ],
    map: map
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
      success : function(result) {
        startAirportLat = result.airports[0].lat;
        startAirportLong = result.airports[0].lng;
        console.log(startAirportLat,startAirportLong)
        // getArrivingAirportLongLat(arrivingAirport, key, startAirportLat, startAirportLong);
        if (startAirport === false)
          $("#messageErr").html("please pick a different arrivingDestination")
        else {
          $.ajax({
            type: 'GET',
            url : "https://airport.api.aero/airport/" + arrivingAirport + "?user_key=" + key,
            dataType : "jsonp",
            success : function(result) {
              arrivingAirportLat = result.airports[0].lat;
              arrivingAirportLong =result.airports[0].lng;
              console.log(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong)
        // openGoogleMaps (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong);
        initialize (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong)
        // initialize(40.639751, 73.778925, 33.942536,118.408075)
                }
              })
            }
        }
      });
  });
});
