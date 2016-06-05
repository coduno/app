/* exported util */

var util = {
	baseUrl: function() {
		var prefix = 'https://platform.cod.uno';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'http://localhost:8080';
		}

		if (location.origin.indexOf('coduno-lab') !== -1) {
			prefix = 'https://platform-dot-coduno-lab.appspot.com';
		}

		return prefix;
	},
	build: function(suffix) {
		return util.baseUrl() + suffix;
	},
	getWSUrl: function(suffix) {
		var prefix = 'wss://ws.cod.uno:8080';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'ws://localhost:8080';
		}

		return prefix + suffix;
	},
	getSockWSUrl: function(suffix) {
		var prefix = 'https://platform.cod.uno';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'http://localhost:8080';
		}

		return prefix + suffix;
	},
	computeDuration: function(duration) {
		var minutes = Math.floor(duration / 60);
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
		var app = document.querySelector('#app');
		app.error = error;
		page.redirect('/error');
	},
	padTime: function(i) {
		var str = String(i);
		return '00'.substring(0, 2 - str.length) + str;
	},
	formatDate: function(date, omitTime) {
		if (!(date instanceof Date)) {
			date = new Date(date * 1000);
		}

		var result = date.toISOString();
		result = result.substring(0, result.indexOf('T'));

		if (omitTime) {
			return result + ' UTC';
		}

		return result + ' ' + util.padTime(date.getUTCHours()) + ':' + util.padTime(date.getUTCMinutes()) + ' UTC';
	}
};
