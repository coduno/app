var Behaviors = Behaviors || {};

Behaviors.ServiceBehavior = {
	ready: function(){
		this.app = document.querySelector('#app');
	},
	_onError: function(err){
		this.app.stopLoading();
		util.error(err);
	}
};