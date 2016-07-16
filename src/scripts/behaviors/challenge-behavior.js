var Behaviors = Behaviors || {};

Behaviors.ChallengeBehavior = {
	properties: {
		taskIndex: {
			type: Number,
			notify: true,
			value: 0
		},
		challengeTemplate: {
			type: Object,
			notify: true
		},
		result: {
			type: Object,
			notify: true
		},
		task: {
			type: Object,
			notify: true,
			observer: '_taskChanged'
		}
	},
	observers: [
		'afterPropertiesSet(challengeTemplate, result)'
	],
	afterPropertiesSet: function(challengeTemplate, result){
		this.taskIndex = 0;
		if(!result.taskResults || result.taskResults.length === 0){
			this.startTask();
			this.startChallenge();
			return;
		}
		var hasEndTime = false;
		var self = this;
		result.taskResults.forEach(function(taskResult){
			var index = challengeTemplate.tasks.indexOf(taskResult.task.id);
			if(index >= self.taskIndex){
				self.taskIndex = index;
				hasEndTime = !!taskResult.endTime;
			}
		});
		if(hasEndTime){
			this.taskIndex++;
			this.startTask();
		}else{
			this.getTask();
		}
		this.startChallenge();
	},
	startTask: function(){
		this.$.taskService.startTask(this.result.id, this.challengeTemplate.tasks[this.taskIndex]);
	},
	getTask: function(){
		this.$.taskService.getById(this.challengeTemplate.tasks[this.taskIndex]);
	},
	onTaskStarted: function(){
		this.getTask();
	},
	// TODO abstract task listeners
	_taskChanged: function(task){
		if(!task){
			return;
		}
		var webInterface = document.createElement(this.task.endpoint.component);
		webInterface.task = task;
		webInterface.challengeId = this.challenge.id;

		var element = this;
		webInterface.addEventListener('task-finished', function(){
			var msg = 'Are you sure you want to finish this task? You will not able to come back again and change it.';
			if (!window.confirm(msg)) {
				return;
			}
			// element.$.taskService.finishTask();
			element._nextTask();
		});

		this._replaceContent(webInterface);
		this._showContent();
    this.elementTaskChanged();
	},
	_nextTask: function(){
		this.taskIndex++;
		if(this.taskIndex < this.challengeTemplate.tasks.length){
			this.startTask();
			return;
		}
		this.$.coolNav.stop();
		this._challengeEnded();
	},
	_challengeEnded: function(){
		var self = this;
		this.importHref('/elements/coder/challenge/info/challenge-ended.html', function(){
			var webInterface = document.createElement('challenge-ended');
			webInterface.challengeId = self.challenge.id;
			self._replaceContent(webInterface);
		});
	},
	// CONTENT RELATED
	_replaceContent: function(element){
		this._showContent();
		this.$.content.innerHTML = '';
		this.$.content.appendChild(element);
	},
	_showContent: function(){
		this.$.wrapper.style.display = '';
	},
	_hideContent: function(){
		this.$.wrapper.style.display = 'none';
	}
};
