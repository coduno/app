var Behaviors = Behaviors || {};

Behaviors.LoadingBehavior = {
	ready: function(){
		this._mainApp = document.querySelector('#app');
	},
  startAppLoading: function(){
    this._mainApp.startLoading();
  },
  stopAppLoading: function(){
    this._mainApp.stopLoading();
  }
};
