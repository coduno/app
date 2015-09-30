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
	accessToken: function() {
		if (localStorage.accessToken) {
			return JSON.parse(localStorage.accessToken);
		}
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
	get: function(ajaxRequest, route, authorization) {
		ajaxRequest.url = this.build(route);
		ajaxRequest.method = 'GET';
		ajaxRequest.headers = {'Authorization': (authorization || 'Token ' + this.accessToken().Value)};
		ajaxRequest.generateRequest();
	},
	post: function(ajaxRequest, route, body) {
		ajaxRequest.url = this.build(route);
		ajaxRequest.method = 'POST';
		ajaxRequest.headers = {'Authorization': 'Token ' + this.accessToken().Value};
		ajaxRequest.body = JSON.stringify(body);
		ajaxRequest.generateRequest();
	},
	put: function(ajaxRequest, route, body) {
		ajaxRequest.url = this.build(route);
		ajaxRequest.method = 'PUT';
		ajaxRequest.headers = {'Authorization': 'Token ' + this.accessToken()};
		ajaxRequest.body = JSON.stringify(body);
		ajaxRequest.generateRequest();
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
		if (this.initialError !== undefined) {
			// TODO(flowlo): Do not disregard further errors,
			// save them somewhere and report them too.
			console.log('Looks like handleError was called twice. This should not have happened.');
			return;
		}

		this.initialError = error;
		if (error.detail.request.xhr.status === 401) {
			return page.redirect('/login');
		}
		page.redirect('/error');
	},
	initialError: undefined,
	languages: [
		'java',
		'javaut',
		'py',
		'c',
		'js'
	]
};
