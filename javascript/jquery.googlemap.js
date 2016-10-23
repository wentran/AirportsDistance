$(function() {

	$.fn.googleMap = function(params) {
		params = $.extend( {
			zoom : 10,
			coords : [40.639751, -73.778925],
			type : "ROADMAP",
			debug : false,
			langage : "english",
			overviewMapControl:   false,
			streetViewControl: false,
			scrollwheel: false,
			mapTypeControl: false
		}, params);

		switch(params.type) {
			case 'HYBRID':
			case 'TERRAIN':
				params.type = google.maps.MapTypeId[params.type];
				break;
			default:
				params.type = google.maps.MapTypeId.TERRAIN;
				break;
		}

		this.each(function() {

			var map = new google.maps.Map(this, {
				zoom: params.zoom,
				center: new google.maps.LatLng(params.coords[0], params.coords[1]),
				mapTypeId: params.type,
				scrollwheel: params.scrollwheel,
				overviewMapControl: params.overviewMapControl,
				mapTypeControl: params.mapTypeControl

			});

			
		});

		return this;
	}
})


$(function() {
   $("#map").googleMap(); // Map center (optional)
              
           
          });