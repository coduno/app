var Behaviors = Behaviors || {};

Behaviors.AppConnection = {
	ready: function(){
		this._mainApp = document.querySelector('#app');
	},
	_getCurrentUser: function(){
		return this._mainApp.user;
	}
};
