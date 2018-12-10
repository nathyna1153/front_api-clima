var obj = {
	scl: {lat: -33.4377968, lng:-70.6504451},
	ccp: {lat: -36.8270169, lng: -73.0503189},
	pmt: {lat: -41.4629843, lng: -72.9655277},
	par: {lat: -53.1417468, lng: -70.9763064}
}
// var imagenes ={
// 	'clear-day' : 'https://darksky.net/images/weather-icons/clear-day.png',
// 	'clear-night' : 'https://darksky.net/images/weather-icons/clear-night.png',
// 	'partly-cloudy-day': 'https://darksky.net/images/weather-icons/partly-cloudy-day.png'

// };

var urlBaseImg = 'https://darksky.net/images/weather-icons/';


var map, marker;

function initMap() {
	console.log("se inicia mapa");
	map = new google.maps.Map(document.getElementById('map'), {zoom: 8, center: obj.scl});
	marker = new google.maps.Marker({position: obj.scl, map: map});
}
/*google.maps.event.addListener(marker,'click',function() {
  map.setZoom(9);
  map.setCenter(marker.getPosition());
});*/




$(function(){

	$('#select').on('change', function(){

		if($(this).val() == "sel"){
			$("#clima").text("");
			$(".img-responsive").attr('src',"");
			return;
		}

		var lat = obj[$(this).val()].lat
		var lng = obj[$(this).val()].lng
		console.log(map);
		marker.setMap(null);

		marker = new google.maps.Marker({position: obj[$(this).val()], map: map});
		map.setCenter(marker.getPosition());
		


		$.ajax({
			url:'https://api.darksky.net/forecast/a28092268aefb14f271bc0f1d663c244/' + lat + ','+ lng+'?lang=es&units=si',
			dataType:"jsonp",
			method:'GET'
		})
		.done(function(data){
			console.log(data);
			console.log(data.currently.temperature);

			$("#clima").text(data.currently.temperature + "° " + data.currently.summary);
			// $(".img-responsive").attr('src',imagenes[data.currently.icon]);
			$(".img-responsive").attr('src',urlBaseImg + data.currently.icon + ".png");
		})

	})
})