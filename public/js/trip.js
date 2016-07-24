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
var TEXT_KEYS = ['title', 'location', 'price', 'style', 'rating'];

function injectImage(url, imgElem){
	var gsReference = storage.refFromURL(url);
	gsReference.getDownloadURL().then(function(url) {
		console.log('got url: ', url)
		console.log(imgElem.attr('src'))
		imgElem.attr('src', url);
	  // Get the download URL for 'images/stars.jpg'
	  // This can be inserted into an <img> tag
	  // This can also be downloaded directly
	}).catch(function(error) {
	  console.log('error downloading image', error);
	});
}

database.ref('trips/' + tripId).on('value', function(snapshot) {
	var obj = snapshot.val();
	$.each(obj, function(key, value) {
	    if (TEXT_KEYS.indexOf(key) >= 0) {
	    	$('.locol-'+key).text(value);
	    }
	});
	injectImage(obj.cover_photo, $('.locol-cover_photo'));
});



