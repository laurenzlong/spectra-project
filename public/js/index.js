// Initialize Firebase
var config = {
apiKey: "AIzaSyArj4LyQReInkR_--KfcGeDdF1ELVOi0MM",
authDomain: "spectra-trip-app.firebaseapp.com",
databaseURL: "https://spectra-trip-app.firebaseio.com",
storageBucket: "spectra-trip-app.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
var storage = firebase.storage();

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

function init(){
	database.ref('trips/').on('child_added', function(snapshot) {
		var trip = snapshot.val();
		var id = snapshot.key;
		var link = '/listing.html?'+id;
		var card = $('<div class="col-md-6 img-portfolio">\
 				<a class="locol-link" href="'+link+'">\
                    <img class="img-responsive img-hover locol-cover_photo">\
                </a>\
                <h3>\
                    <a class="locol-link locol-title" href="'+link+'">' + trip.title + '</a>\
                </h3>\
                <p class="locol-location">' + trip.location + '</p>\
                <p class="locol-price"> Price: $' + trip.price + '</p>\
            </div>');

		injectImage(trip.cover_photo, card.find('img'));
		$('.locol-trips').append(card);
	});
	$('#search-form').on('submit', onFormSubmit);
}

function onFormSubmit(event) {
  event.preventDefault();
  var $searchTerm = $('.locol-search-term').val();
}

function filterByPrice(upper, lower){
	var priceFilterRef = firebase.database().ref('trips').orderByChild('price').endAt(upper).startAt(lower);
	priceFilterRef.on('child_added', function(snapshot) {

	});
}

$(init());
