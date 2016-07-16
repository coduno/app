var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

Behaviors.Providers.Team = {
	_getInitialLetter: function(team){
		return team.name.charAt(0).toUpperCase();
	}
};
