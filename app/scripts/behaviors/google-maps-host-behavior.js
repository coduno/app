var Behaviors = Behaviors || {};

Behaviors.GoogleMapsHostBehavior = {
	properties: {
		apiConfig: {
			type : Object,
			notify: true,
			value: function() {
				// This api key for the maps api will only work on our production and staging enviornment
				// so using it locally(or any other place for that matter) will only result in errors.
				// No api key is needed for local development.
				if (location.origin.indexOf('localhost') === -1) {
					return {
						apiKey: 'AIzaSyCnqlcAd2M-qW20SDsghrBOOLvs144c3og',
						version: '3.24'
					};
				} else {
					return {
						apiKey: 'AIzaSyCTe80fABPhCJcjhd1y5Nxkdr3gqAJXOjM',
						version: '3.24'
					};
				}
			}
		}
	}
};
