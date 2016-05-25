var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

Behaviors.Providers.General = {
	properties: {
		baseUrl: {
			type: String
		},
		data: {
			type: Object,
			reflectToAttribute: true,
			notify: true
		}
	},
	ready: function(){
		var prefix = 'https://platform.cod.uno';

		if (location.origin.indexOf('localhost') !== -1) {
			prefix = 'http://localhost:8080';
		}

		this.baseUrl = prefix;
	}
};
