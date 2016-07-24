var config = {
apiKey: "AIzaSyArj4LyQReInkR_--KfcGeDdF1ELVOi0MM",
authDomain: "spectra-trip-app.firebaseapp.com",
databaseURL: "https://spectra-trip-app.firebaseio.com",
storageBucket: "spectra-trip-app.appspot.com",
};
var app = firebase.initializeApp(config);
var database = firebase.database();
var storage = firebase.storage();
var tripId = window.location.search.substring(1);
var TEXT_KEYS = ['title', 'location', 'price', 'style', 'rating', 'description'];

function injectImage(url, imgElem){
	var gsReference = storage.refFromURL(url);
	gsReference.getDownloadURL().then(function(url) {
		console.log('got url: ', url)
		console.log(imgElem.attr('src'))
		imgElem.attr('src', url);
	}).catch(function(error) {
	  console.log('error downloading image', error);
	});
}

function injectHostInfo(hostId){
	database.ref('hosts/' + hostId).on('value', function(snapshot) {
		var host = snapshot.val();
		$('.locol-host-name').text(host.name);
		injectImage(host.profile_pic, $('.locol-host-profile_pic'));
	});
}

function injectItinerary(itinerary) {
	var list = $('.locol-itinerary');
	$.each(itinerary, function(key, value) {
	    list.append($('<li>' + key + '\t' +  value + '</li>'));
	})
}

database.ref('trips/' + tripId).on('value', function(snapshot) {
	var obj = snapshot.val();
	$.each(obj, function(key, value) {
	    if (TEXT_KEYS.indexOf(key) >= 0) {
	    	if (key === 'price') {
	    		$('.locol-'+key).text('$ ' + value);
	    	} else {
		    	$('.locol-'+key).text(value);
	    	}
	    }
	});
	injectImage(obj.cover_photo, $('.locol-cover_photo'));
	injectHostInfo(obj.host_id);
	injectItinerary(obj.itinerary);
});



