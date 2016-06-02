var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

var NewBehavior = {
	properties: {
		data: {
			type: Object,
			notify: true,
			reflectToAttribute: true
		},
		showProgress: {
			type: Boolean,
			value: false
		}
	},
	listeners: {
		'request-finished': '_requestFinished',
		'request-sent': '_requestSent',
		'request-failed': '_requestFailed'
	},
	ready: function(){
		this.appConnection = document.getElementById('app');
	},
	_requestFinished: function(e, d){
		this.data = d;
		if(this.showProgress){
			this.appConnection.stopLoading();
		}
	},
	_requestSent: function(){
		if(this.showProgress){
			this.appConnection.startLoading();
		}
	},
	_requestFailed: function(){
		if(this.showProgress){
			this.appConnection.stopLoading();
		}
	}
};

Behaviors.Providers.General = [
	Behaviors.Requests.Base,
	Behaviors.Requests.Handler,
	NewBehavior
];
