var Behaviors = Behaviors || {};
Behaviors.Requests = Behaviors.Requests || {};

Behaviors.Requests.Handler = {
	properties: {
		error: {
			notify: true,
			reflectToAttribute: true
		}
	},
	listeners: {
		'error': 'onError',
		'response': 'onResponse',
		'request': 'onRequest'
	},
	onResponse: function(e){
		e.stopPropagation();
		this.error = null;
		this.fire('request-finished', e.detail.response);
	},
	onError: function(e){
		e.stopPropagation();
		this.error = {
			'status': e.detail.request.xhr.status,
			'error': e.detail.request.xhr.response
		};
		if (this.error.status === 500 || this.error.status === 404 || this.error.status === 403){
			util.error(this.error);
			return;
		}
		if (this.error.status === 401){
			page('/login');
		}
		this.fire('request-failed', this.error);
	},
	onRequest: function(){
		//request was sent
		this.fire('request-sent');
	}
};
