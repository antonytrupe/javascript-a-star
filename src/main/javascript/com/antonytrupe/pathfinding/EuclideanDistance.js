function ManhattanDistance(_state) {
	// private, use getter and setter methods
	this._state = _state;

	this.getActions = function() {

		// mock
		switch (this._state.node) {
		case 0:
			return [ {
				'state' : one
			}, {
				'state' : two
			} ];
		case 2:

			return [ {
				'state' : three
			} ];
		}
		return [];
	};
	this.hScore = function() {
		// mock
	};

	this.keepSearching = function() {
		return true;
	};
	this.getGoal = function() {
		// mock
		return three;
	};
	this.gScore = function() {
		// mock
	};
	this.setState = function(state) {
		// mock
		this._state = state;
		return this;
	};
	this.getState = function() {
		return this._state;
	};
}