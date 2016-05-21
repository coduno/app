var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

Behaviors.Providers.General = {
	properties: {
		baseUrl: {
			type: String,
			value: util.baseUrl()
		},
		data: {
			reflectToAttribute: true,
			notify: true
		}
	}
};
