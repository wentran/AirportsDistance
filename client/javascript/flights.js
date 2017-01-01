var IntentMedia = (function () {
  var airport_distances = airport_distances || airport_map();
  function airport_map () {
    return {
      JFK: {LAX: 2475, LAS: 2248, PDX: 2454},
      LAX: {JFK: 2475, LAS: 236, PDX: 834},
      LAS: {JFK: 2248, LAX: 236, PDX: 763},
      PDX: {JFK: 2454, LAS: 763, LAX: 834}
    }
  }
  function airport_exists (airport_code) {
    return airport_map().hasOwnProperty(airport_code);
  }
  function distance_between_airports (from_airport, to_airport) {
    if (airport_exists(from_airport) &&airport_exists(to_airport)) {
      if (from_airport === to_airport) {
        return 0;
      }
      return airport_distances[from_airport][to_airport];
    }
    return -1;
  }
  return {
    airport_map: airport_map,
    airport_exists: airport_exists,
    distance_between_airports: distance_between_airports
  }    
})();
