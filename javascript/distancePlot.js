/**
Display Google Map on screen - utilizes Google Map API
 */

function initialize(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong) {
  var centerOption = new google.maps.LatLng((startAirportLat+arrivingAirportLat)/2, (startAirportLong+arrivingAirportLong)/2);
  var mapOptions = {
    zoom: 4,
    center: centerOption,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

// Define markers using SVG path notation.

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

  var Coordinates = [
    new google.maps.LatLng(startAirportLat, startAirportLong),
    new google.maps.LatLng(arrivingAirportLat, arrivingAirportLong)
  ];

  var line = new google.maps.Polyline({
    path: Coordinates,
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

