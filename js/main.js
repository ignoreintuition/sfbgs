// Stop Facebook Gun Sales 
// Automated searching of gun sales on FB
// Created by Brian Greig
// 
// https://github.com/ignoreintuition/sfbgs

window.data = null;

function loadPosts(){
	FB.api('/search?q=AR15&type=page', function (response) {
		handlePostResponse(response);
	});
}

function handlePostResponse(response){
	$(output).empty();
	$(output).append('<ul>');
	response.data.forEach(function(d){
		$(output).append('<li> <a href="https://www.facebook.com/' + d.id + '" target="_blank">' + d.name + '</a></li>');
	});
	$(output).append('<ul>');
	$(next).unbind('click');
	$(next).bind('click', function(){
		$.ajax({
			type: 'GET',
			url: response.paging.next,
			dataType: 'jsonp',
			cache: true
		}).done(function(response) {
			handlePostResponse(response);
		}).fail(console.log("failed"));
	})
	$(prev).unbind('click');
	$(prev).bind('click', function(){
		$.ajax({
			type: 'GET',
			url: response.paging.previous,
			dataType: 'jsonp',
			cache: true
		}).done(function(response) {
			handlePostResponse(response);
		}).fail(console.log("failed"));
	})

}

window.fbAsyncInit = function() {
	var myToken = null;
	FB.init({
		appId      : '155081068243032',
		xfbml      : true,
		version    : 'v2.6'
	});
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			loadPosts();
		}
		else {
			FB.login();
		}

	});	
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

