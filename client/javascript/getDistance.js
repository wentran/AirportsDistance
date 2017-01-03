
$(document).ready(function() {

  $("#buttonSubmit").click(function(e) {
    e.preventDefault();
    var arrivingAirport = ($("#arrivingAirport").val());
    var startAirport = ($("#startAirport").val());
    var table = document.getElementById('distanceTable');
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

// ajax calls and plot route on map
var apiKey = '5893b60d8bde3259e625ced3de9ef69f';
$.when (
  $.ajax({
    type: 'GET',
    url : "https://airport.api.aero/airport/" + startAirport + "?user_key=" + apiKey,
    dataType : "jsonp",
    success : function(result) {
      startAirportLat = result.airports[0].lat;
      startAirportLong = result.airports[0].lng;
      console.log(startAirportLat,startAirportLong)
      if (startAirport === false)
        $("#messageErr").html("please pick a different arriving airport")
      else {
        $.ajax({
          type: 'GET',
          url : "https://airport.api.aero/airport/" + arrivingAirport + "?user_key=" + apiKey,
          dataType : "jsonp",
          success : function(result) {
            arrivingAirportLat = result.airports[0].lat;
            arrivingAirportLong =result.airports[0].lng;
                // console.log(startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong)
                initialize (startAirportLat, startAirportLong, arrivingAirportLat, arrivingAirportLong)
              }
            })
      }
    }
  }),
  // https://airport.api.aero/airport/distance/jfk/bna?user_key=5893b60d8bde3259e625ced3de9ef69f
  // startAirport = startAirport.toLowerCase();
  // arrivingAirport = arrivingAirport.toLowerCase();
  $.ajax({
    type: 'GET',
    url : "https://airport.api.aero/airport/distance/" + startAirport.toLowerCase() + "/" + arrivingAirport.toLowerCase() + "?user_key=" + apiKey,
    dataType : "jsonp",
    success : function(resultDistance) {
      console.log('clicking ----distance api body---',resultDistance.distance)
      var distanceResult = resultDistance.distance + " " +"km"
      var route = startAirport + " "+ 'to'+ " "+ arrivingAirport;
      cell1.innerHTML = route;
      cell2.innerHTML = distanceResult;
    }
  })
  ).then (function (){
    console.log('hereeee')
  })


});
});

