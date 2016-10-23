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
// 	$.fn.addMarker = function(params) {
// 		params = $.extend( {
// 			coords : false,
// 			address : false,
// 			url : false,
// 			id : false,
// 			icon : false,
// 			draggable : false,
// 			title : "",
// 			text : "",
// 			success : function() {}
// 		}, params);

// 		this.each(function() {
// 			$this = $(this);

// 			if(!$this.data('googleMap')) {
// 				if($this.data('googleDebug'))
// 					console.error("jQuery googleMap : Unable to add a marker where there is no map !");
					
// 				return false;
// 			}

// 			if(!params.coords && !params.address) {
// 				if($this.data('googleDebug'))
// 					console.error("jQuery googleMap : Unable to add a marker if you don't tell us where !");
					
// 				return false;
// 			}

// 			if(params.address && typeof params.address == "string") {

// 				var geocodeAsync = function($that) {

// 					var geocoder = new google.maps.Geocoder();

// 					geocoder.geocode({
// 						address : params.address,
// 						bounds : $that.data('googleBound'),
// 						language : $that.data('googleLang')
// 					}, function(results, status) {

// 						if (status == google.maps.GeocoderStatus.OK) {
// 							$that.data('googleBound').extend(results[0].geometry.location);

// 							if(params.icon) {
// 								var marker = new google.maps.Marker({
// 									map: $this.data('googleMap'),
// 									position: results[0].geometry.location,
// 									title: params.title,
// 									icon: params.icon,
// 									draggable: params.draggable
// 								});
// 							} else {
// 								var marker = new google.maps.Marker({
// 									map: $that.data('googleMap'),
// 									position: results[0].geometry.location,
// 									title: params.title,
// 									draggable: params.draggable
// 								});
// 							}

// 							if(params.draggable) {
// 								google.maps.event.addListener(marker, 'dragend', function() {
// 									var location = marker.getPosition();

// 									var coords = {};

// 									coords.lat = location.lat();
// 									coords.lon = location.lng();

// 									params.success(coords, $this);
// 								});
// 							}

// 							if(params.title != "" && params.text != "" && !params.url) {
// 								var infowindow = new google.maps.InfoWindow({
// 									content: "<h1>"+params.title+"</h1>"+params.text
// 								});

// 								var map = $that.data('googleMap');

// 								google.maps.event.addListener(marker, 'click', function() {
// 									infowindow.open(map, marker);
// 								});
// 							} else if(params.url) {
// 								google.maps.event.addListener(marker, 'click', function() {
// 									document.location = params.url;
// 								});
// 							}

// 							if(!params.id) {
// 								$that.data('googleMarker').push(marker);
// 							} else {
// 								$that.data('googleMarker')[params.id] = marker;
// 							}

// 							if($that.data('googleMarker').length == 1) {
// 								$that.data('googleMap').setCenter(results[0].geometry.location);
// 								$that.data('googleMap').setZoom($that.data('googleMap').getZoom());
// 							} else {
// 								$that.data('googleMap').fitBounds($that.data('googleBound'));
// 							}

// 							var coords = {};
// 							coords.lat = results[0].geometry.location.lat();
// 							coords.lon = results[0].geometry.location.lng();

// 							params.success(coords, $this);

// 						} else {
// 							if($this.data('googleDebug'))
// 								console.error("jQuery googleMap : Unable to find the place asked for the marker ("+status+")");
// 						}
// 					});
// 				}($this);
// 			} else {
// 				$this.data('googleBound').extend(new google.maps.LatLng(params.coords[0], params.coords[1]));

//         			if(params.icon) {
// 					var marker = new google.maps.Marker({
// 						map: $this.data('googleMap'),
// 						position: new google.maps.LatLng(params.coords[0], params.coords[1]),
// 						title: params.title,
// 						icon: params.icon,
// 						draggable: params.draggable
// 					});
// 				} else {
// 					var marker = new google.maps.Marker({
// 						map: $this.data('googleMap'),
// 						position: new google.maps.LatLng(params.coords[0], params.coords[1]),
// 						title: params.title,
// 						draggable: params.draggable
// 					});
// 				}

//         			if(params.title != "" && params.text != "" && !params.url) {
//           				var infowindow = new google.maps.InfoWindow({
// 						content: "<h1>"+params.title+"</h1>"+params.text
// 					});

// 					var map = $this.data('googleMap');

// 	        			google.maps.event.addListener(marker, 'click', function() {
// 		        			infowindow.open(map, marker);
// 	        			});
// 				} else if(params.url) {
//           				google.maps.event.addListener(marker, 'click', function() {
//               					document.location = params.url;
//         				});
// 				}

// 				if(params.draggable) {
// 					google.maps.event.addListener(marker, 'dragend', function() {
// 						var location = marker.getPosition();

// 						var coords = {};

// 						coords.lat = location.lat();
// 						coords.lon = location.lng();

// 						params.success(coords, $this);
// 					});
// 				}

// 				if(!params.id) {
//        					$this.data('googleMarker').push(marker);
//         			} else {
//         				$this.data('googleMarker')[params.id] = marker;
//         			}

// 				if($this.data('googleMarker').length == 1) {
// 					$this.data('googleMap').setCenter(new google.maps.LatLng(params.coords[0], params.coords[1]));
// 					$this.data('googleMap').setZoom($this.data('googleMap').getZoom());
// 				} else {
// 					$this.data('googleMap').fitBounds($this.data('googleBound'));
// 				}

// 				params.success({
// 					lat: params.coords[0],
// 					lon: params.coords[1]
// 				}, $this);
// 			}
// 		});

// 		return this;
// 	}
// }
// 	