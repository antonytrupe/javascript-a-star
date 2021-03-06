/**
 * @constructor
 * @param {SquareGridMap}
 *            _state
 * @param {Object}
 *            goal
 */
function ManhattanDistanceModel(_state, goal, steps) {
	// private, use getter and setter methods
	this._state = _state;

	this.goal = goal;

	this.steps = steps;

	// this._initial_state = _state;

	// returns an array of instances of the world state, SquareGridMap in this
	// case
	this.getActions = function() {
		var actions = [];
		for (var x = -1; x <= 1; x++) {

			// bounds check x
			if (this._state.position.x + x >= 0
					&& this._state.position.x + x < this._state.map.length) {
				for (var y = -1; y <= 1; y++) {
					// bounds check y
					if (this._state.position.y + y >= 0
							&& this._state.position.y + y < this._state.map[this._state.position.x
									+ x].length) {

						// check to make sure its not the current position and
						// not a diagonal move
						if ((x == 0 && y == 0) || (x != 0 && y != 0)) {
							continue;
						}
						// valid location, but might be a wall

						// check for not a wall
						if (this._state.map[this._state.position.x + x][this._state.position.y
								+ y] != '|') {

							var direction = '';
							if (x == -1) {
								direction = 'up';
							} else if (x == 1) {
								direction = 'down';
							} else if (y == -1) {
								direction = 'left';
							} else if (y == 1) {
								direction = 'right';
							}

							actions.push({
								'model' : new ManhattanDistanceModel(
										new SquareGridMap(this._state.map, {
											'x' : this._state.position.x + x,
											'y' : this._state.position.y + y
										}), this.goal, this.steps + 1),
								'action' : {
									'method' : direction
								}
							});
						}
					}
				}
			}
		}
		return actions;
	};

	this.hScore = function() {
		var dx = Math.abs(this.goal.x - this._state.position.x);
		var dy = Math.abs(this.goal.y - this._state.position.y);
		return dx + dy;
	};

	// I think this needs the previous gscore
	this.gScore = function() {
		return this.steps;
		// some models will want to only compare the initial state to the
		// current state, and not take into account how many actions it has
		// taken to get to the current state
		// some models will care about both
	};

	// in order of estimated cost from the node to the goal
	this.closedPriorityQueueComparator = function(one, two) {
		if (one.hScore() < two.hScore()) {
			return 1;
		} else if (one.hScore() > two.hScore()) {
			return -1;
		} else {
			return 0;
		}
	};

	// in order of actual cost from start to current node plus estimated
	// cost to goal
	this.openPriorityQueueComparator = function(one, two) {
		if (one.hScore() + one.gScore() < two.hScore() + two.gScore()) {
			return -1;
		} else if (one.hScore() + one.gScore() > two.hScore() + two.gScore()) {
			return 1;
		} else {
			return 0;
		}
	};

	this.keepSearching = function() {
		return true;
	};

	this.atGoal = function() {
		return JSON.stringify(this._state.position) == JSON
				.stringify(this.goal);
	};

}