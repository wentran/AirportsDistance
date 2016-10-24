$(function() {
	$.fn.googleMap = function(props) {
		props = $.extend( {
			zoom : 10,
			coords : [40.639751, -73.778925],
			type : "ROADMAP",
		}, props);

		switch(props.type) {
			case 'TERRAIN':
				props.type = google.maps.MapTypeId[props.type];
				break;
			default:
				props.type = google.maps.MapTypeId.TERRAIN;
				break;
		}
		this.each(function() {
			var map = new google.maps.Map(this, {
				zoom: props.zoom,
				center: new google.maps.LatLng(props.coords[0], props.coords[1]),
				mapTypeId: props.type,
			});
		});
		return this;
	}
})


$(function() {
   $("#map").googleMap();
          });