/*
    miley.js
    An implementation of the MileyFeed project.
*/
var interval;
var english = true; 
var running = true; 
var request_for_data = new XMLHttpRequest(); 
var user_pass = "AC5d657949ce0051d62cf83fcb1f36b052:a060ac4023eb7cdbb0f65212063033cc";
var tweets = new Array(); 
var count = 0; 

var twilio_api_base_non_secure = "api.twilio.com";
var twilio_api_base = "https://" + twilio_api_base_non_secure;

function load_tweets(e){
	if (request_for_data.status == 200){
		//do something with the content
		var content = request_for_data.responseText; 
		var photo_stream_items = JSON.parse(content);
		var newItems = 0; 
        var messages = photo_stream_items["messages"];

        console.log(photo_stream_items);
		for (var photo_id in messages) {
            var photo = messages[photo_id];
            if (photo_stream_items.messages[photo_id].direction == "inbound" && tweets.indexOf(photo_id) < 0) {
				tweets.push(photo_id);
				newItems++; 
        	}
		}
        console.log(i+count<tweets.length);
		for (var i = 0; i+count<tweets.length && i < 10; i++) {
            console.log(messages[tweets[i+count]].subresource_uris.media);
            request2(twilio_api_base + messages[tweets[i+count]].subresource_uris.media);
		}
        var ul = document.getElementById('locol-snapshot'); 
		var liList = ul.getElementsByTagName('li'); 
		for (var j = liList.length-1; j > 25;j--){
			liList[j].style.display = 'none';
		}

	} else {
		console.log(request_for_data.status);
	}
	count += newItems; 
}; 



function request2(theURL) {
    var request2 = new XMLHttpRequest();
    //specifying HTTP method, URL, and asynchronous flag
    request2.open('GET', theURL, true); 
    request2.setRequestHeader("Authorization", "Basic " + btoa(user_pass));
    //adding an event handler to the request
    request2.addEventListener('load', function (e) {
    if (request2.status == 200){
        var content = request2.responseText; 
        var parsed_content = JSON.parse(content);
        console.log(parsed_content);
        var image_list = parsed_content["media_list"];
        var image = image_list[0].uri;
        if (image_list[0].content_type == "image/jpeg") {
            var ul = document.getElementById('locol-snapshot'); 
            var li = document.createElement('li');  
            var post = '<div id=twe>';
            post += '<img id=picture src="' + "http://" + twilio_api_base_non_secure +  image.substring(0, image.length - 5) + '" />'
            post += '</div>';  
            li.innerHTML = post; 
            var x = ul.getElementsByTagName('li')[0];
            ul.insertBefore(li, x);
        }

    }}, false); 

    //to start the request, optionally witha request body for POST requsts
    request2.send(null); 
}; 

function request(request1, theURL, callback) {
	
	//specifying HTTP method, URL, and asynchronous flag
    request1.open('GET', theURL, true); 
	request1.setRequestHeader("Authorization", "Basic " + btoa(user_pass));
	//adding an event handler to the request
	request1.addEventListener('load', callback, false); 

	//to start the request, optionally witha request body for POST requsts
	request1.send(null); 
}; 

// This code will be executed when the page finishes loading
window.addEventListener('load', function(){
	//creating the request
    var the_url = twilio_api_base + "/2010-04-01/Accounts/AC5d657949ce0051d62cf83fcb1f36b052/Messages.json";
    //sets the interval so that page reloads ever 3000ms
    interval = window.setInterval(function() {request(request_for_data, the_url, load_tweets)}, 1000);

}, false);


// Add more supporting code here!
