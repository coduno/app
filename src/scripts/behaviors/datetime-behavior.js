var Behaviors = Behaviors || {};

Behaviors.DateTimeBehavior = {
	_formatDate: function (date) {
		if(!date){
			return '';
		}
		return util.formatDate(date);
	},
	_getDate: function(d){
		var date = new Date(d * 1000);
		var result = date.toISOString();
		return result.substring(0, result.indexOf('T'));
	},
	_getTime: function(d){
		var date = new Date(d * 1000);
		var hours = date.getUTCHours();
		var mins = date.getUTCMinutes();
		var time = '';
		if(hours < 10){
			time = time + '0';
		}
		time = time + hours + ':';
		if(mins < 10){
			time = time + '0';
		}
		time = time + mins;
		return time;
	},
	_computeDuration: function(duration) {
		var minutes = Math.floor(duration / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var months = Math.floor(days / 30);
		var formatedDuration = '';
		if (months >= 1) {
			formatedDuration =  months + ' months';
		}
		if (days >= 1) {
			return days + ' days';
		}
		if (hours >= 1) {
			return hours + ' hours';
		}
		return minutes + ' minutes';
	},
};
