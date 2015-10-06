(function(document) {
	// 'use strict';

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');

	app.properties = {
		challenge: {
			type: Object,
			notify: true
		},
		isCompany: {
			type: Boolean,
			notify: true
		},
		isCoder: {
			type: Boolean,
			notify: true
		},
		isLoggedIn: {
			type: Boolean,
			notify: true,
			value: true
		},
		selected: {
			type: String,
			notify: true,
			value: '0'
		},
		ironPagesStyle: {
			type: String,
			notify: true
		},
		progressStyle: {
			notify: true,
			value: 'display: none;'
		},
		error: {
			type: Object,
			notify: true
		},
		pendingRequests: {
			type: Number,
			value: 0
		}
	};

	// TODO(victorbalan): this is an atomic operation so we need an js atomic library
	app.startLoading = function(){
		if(this.pendingRequests <= 0){
			this.pendingRequests = 0;
			app._showProgress();
		}
		app.pendingRequests ++;
	};

	// TODO(victorbalan): this is an atomic operation so we need an js atomic library
	app.stopLoading = function(){
		app.pendingRequests --;
		if(app.pendingRequests <= 0){
			app.pendingRequests = 0;
			app._hideProgress();
		}
	};

	app._showProgress = function(){
		app.progressStyle = '';
		app.ironPagesStyle = 'display: none;';
	};

	app._hideProgress = function(){
		app.progressStyle = 'display: none;';
		app.ironPagesStyle = '';
	};

	app.finishChallenge = function() {
		localStorage.removeItem('challenge');
		localStorage.removeItem('result');
	};

	app.login = function() {
		app.refreshMenu(true);
		if (localStorage.company) {
			return page.redirect('/candidates');
		}
		page.redirect('/challenge');
	};

	app.logout = function() {
		localStorage.clear();
		app.refreshMenu(false);
		page.redirect('/login');
	};

	app.refreshMenu = function(loggedIn) {
		app.isCompany = !!localStorage.company;
		app.isCoder = !app.isCompany;
		app.isLoggedIn = loggedIn;
	};

	app.displayInstalledToast = function() {
		console.log('Caching complete.');
	};

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function() {
		app.refreshMenu(true);
		if(window.location.hash!==''){
			// TODO(victorbalan): Find a way to set the correct selected tab instead
			// of deselecting everything.
			app.selected='-1';
		}

		app.$.cookieService.addEventListener('cookie-user-changed', function (e) {
			localStorage.user = JSON.stringify(e.detail);
			app.login();
		});

		app.$.cookieService.addEventListener('cookie-error', function (e) {
			util.error(e.detail);
		});
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function() {
		// imports are loaded and elements have been registered
                app.progressStyle = 'display: none;';
	});

	// Close drawer after menu item is selected if drawerPanel is narrow
	app.onMenuSelect = function() {
		var drawerPanel = document.querySelector('#paperDrawerPanel');
		if (drawerPanel.narrow) {
			drawerPanel.closeDrawer();
		}
	};

	app.startChallenge = function() {
		// TODO(@flowlo): This deliberately does not check whether
		// challengeKey is meaningful or even present, because if
		// it is not, the XHR will fail and redirect to login.
		var challengeKey = localStorage.getItem('challenge');
		app.$.resultRequest.url = util.build('/results');
		app.$.resultRequest.body = { ChallengeKey: challengeKey };
		app.$.resultRequest.generateRequest();
	};

	app.onChallengeResponse = function(r) {
		var challenge = r.detail.response;
		app.challenge = challenge;
	};

	app.onResultResponse = function(r) {
		var result = r.detail.response;
		localStorage.setItem('result', result.Key);
		app.result = result;
		app.$.challengeRequest.url = util.build('/challenges/' + localStorage.getItem('challenge'));
		app.$.challengeRequest.generateRequest();
	};

	app.createChallenge = function() {
		app.$.taskList.createChallenge();
	};

	app.onResultError = function(e) {
		if(e.detail.request.xhr.status === 403){
			page.redirect('/user/' + JSON.parse(localStorage.getItem('user')).Key + '/challenge/' + localStorage.getItem('challenge'));
			return;
		}
		util.error(e);
	};

})(document);
