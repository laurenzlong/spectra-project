var config = {
apiKey: "AIzaSyArj4LyQReInkR_--KfcGeDdF1ELVOi0MM",
authDomain: "spectra-trip-app.firebaseapp.com",
databaseURL: "https://spectra-trip-app.firebaseio.com",
storageBucket: "spectra-trip-app.appspot.com",
};
firebase.initializeApp(config);

function init(tripid) {
	firebase.database().ref('trips/' + tripId).once('value', function(snapshot) {
		var trip = snapshot.val();

	});
}
$(function(){
	var tripId = window.location.search.substring(1);
	init(tripId);
});

