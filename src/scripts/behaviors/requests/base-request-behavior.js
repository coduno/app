var Behaviors = Behaviors || {};
Behaviors.Requests = Behaviors.Requests || {};

Behaviors.Requests.Base = {
	properties: {
		baseUrl: {
			type: String,
			notify: true,
			value: function(){
				var prefix = 'https://platform.cod.uno';

				if (location.origin.indexOf('localhost') !== -1) {
					prefix = 'http://localhost:8080';
				}

				if (location.origin.indexOf('coduno-lab') !== -1) {
					prefix = 'https://platform-dot-coduno-lab.appspot.com';
				}
				return prefix;
			}
		}
	}
};

