var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

Behaviors.Providers.User = {
	_getInitialLetter: function(user){
		return user.username.charAt(0).toUpperCase();
	},
	_getFullName: function(user){
		if(!user){
			return '';
		}
		var name = '';
		if(user.firstName){
			name = user.firstName + ' ';
		}
		if(user.lastName){
			name = name + user.lastName;
		}
		return name;
	},
	_getMockedSkills: function(){
		return {
			'Algorithmics': 0.8,
			'Readability': 0.6,
			'Security': 0.1,
			'Efficiency': 0.3,
			'Coding Speed': 0.7
		};
	}
};
