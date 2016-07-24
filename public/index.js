// Initialize Firebase
var config = {
apiKey: "AIzaSyArj4LyQReInkR_--KfcGeDdF1ELVOi0MM",
authDomain: "spectra-trip-app.firebaseapp.com",
databaseURL: "https://spectra-trip-app.firebaseio.com",
storageBucket: "spectra-trip-app.appspot.com",
};
firebase.initializeApp(config);

function injectImage(url, imgElem){
	var gsReference = storage.refFromURL(url);
	gsReference.getDownloadURL().then(function(url) {
	  // Get the download URL for 'images/stars.jpg'
	  // This can be inserted into an <img> tag
	  // This can also be downloaded directly
	}).catch(function(error) {
	  console.log('error downloading image', error);
	});
}

function init(){
	firebase.database().ref('trips/' + tripId).on('child_added', function(snapshot) {
		var trip = snapshot.val();
	});
	debugger
	$('#search-form').on('submit', onFormSubmit);
}

function onFormSubmit(event) {
	debugger
  alert( "Handler for .submit() called." );
  event.preventDefault();
}

function filterByPrice(upper, lower){
	var priceFilterRef = firebase.database().ref('trips').orderByChild('price').endAt(upper).startAt(lower);
	priceFilterRef.on('child_added', function(snapshot) {

	});
}

$(init());
