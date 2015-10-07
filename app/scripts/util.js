/* exported util */

var util = {
	build: function(suffix) {
		var prefix = 'https://api.cod.uno';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'http://localhost:8080';
		}

		return prefix + suffix;
	},
	getWSUrl: function(suffix){
		var prefix = 'wss://ws.cod.uno:8090';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'ws://localhost:8090';
		}

		return prefix + suffix;
	},
	company: function() {
		if (localStorage.company) {
			return JSON.parse(localStorage.company);
		}
	},
	user: function() {
		if (localStorage.user) {
			return JSON.parse(localStorage.user);
		}
	},
	computeDuration: function(duration) {
		var seconds = duration / 1e9;
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var months = Math.floor(days / 30);
		if (months >= 1) {
			return months + ' months';
		}
		if (days >= 2) {
			return days + ' days';
		}
		if (hours >= 5) {
			return hours + ' hours';
		}
		return minutes + ' minutes';
	},
	error: function(error) {
		var app = document.querySelector('app-elemment');
		if (error.detail.request.xhr.status === 401) {
			app.isLoggedIn = false;
			return page.redirect('/login');
		}
		app.error = error;
		page.redirect('/error');
	},
	getFormatedTime: function(d){
		var h = Math.floor(d / 3600) % 24;
		var m = Math.floor(d / 60 % 60);
		var s = Math.floor(d % 60);
		return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
	},
	initialError: undefined,
	languages: [
		'java',
		'py',
		'c',
		'js'
	]
};
