
$(document).ready(function(){
$("#buttonSubmit").click( function (e) {
  e.preventDefault();
  var arrivingAirport = ($("#arrivingAirport").val());
  var startAirport = ($("#startAirport").val());
  var table = document.getElementById('myTable');
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  console.log(startAirport,arrivingAirport)
  result = IntentMedia.Distances.distance_between_airports(startAirport,arrivingAirport )
  console.log('======',result);
var route = startAirport + " "+ 'to'+ " "+arrivingAirport;
  cell1.innerHTML = route;
  cell2.innerHTML = result;


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
    // get arriving airport longLat

  });
});
});
