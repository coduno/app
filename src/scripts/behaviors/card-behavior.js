var Behaviors = Behaviors || {};

Behaviors.CardBehavior = {
	properties: {
		elevation: {
			type: Number,
			value: 1
		}
	},
	listeners: {
		mouseover: '_onHovered',
		mouseout: '_onUnhovered'
	},
	_onHovered: function () {
		this.elevation = 5;
	},
	_onUnhovered: function () {
		this.elevation = 1;
	}
};