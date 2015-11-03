/**
 * @constructor
 * @param {SquareGridMap}
 *            _state
 * @param {Object}
 *            goals
 */
function EuclideanDistanceMultiModel(_state, goals, cost) {
	// private, use getter and setter methods
	this._state = _state;

	this.goals = goals;

	this.cost = cost;

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

						// check to make sure its not the current position
						if (x == 0 && y == 0) {
							continue;
						}
						// valid location, but might be a wall

						// check for not a wall
						if (this._state.map[this._state.position.x + x][this._state.position.y
								+ y] != '|') {

							var direction = '';
							if (x == -1) {
								direction = 'N';
							} else if (x == 1) {
								direction = 'S';
							}

							if (y == -1) {
								direction += 'W';
							} else if (y == 1) {
								direction += 'E';
							}

							var cost;
							if (x !== 0 && y !== 0) {
								cost = 1.5;
							} else {
								cost = 1;
							}

							// console.log(direction);
							// console.log(cost);
							// console.log(this.cost);

							actions.push({
								'model' : new EuclideanDistanceMultiModel(
										new SquareGridMap(this._state.map, {
											'x' : this._state.position.x + x,
											'y' : this._state.position.y + y
										}), this.goals, this.cost + cost),
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
		var minScore = null;

		this.goals.forEach(function(goal) {
			//
			// console.log(this);
			var dx = Math.abs(goal.x - this._state.position.x);
			var dy = Math.abs(goal.y - this._state.position.y);
			var score = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			if (minScore == null || score < minScore) {
				minScore = score;
			}
		}, this);

		return minScore;
	};

	this.gScore = function() {
		return this.cost;
	};

	// in order of estimated cost from the node to the goal
	this.closedPriorityQueueComparator = function(that) {
		if (this.hScore() < that.hScore()) {
			return 1;
		} else if (this.hScore() > that.hScore()) {
			return -1;
		} else {
			return 0;
		}
	};

	// in order of actual cost from start to current node plus estimated
	// cost to goal
	this.openPriorityQueueComparator = function(that) {
		if (this.hScore() + this.gScore() < that.hScore() + that.gScore()) {
			return -1;
		} else if (this.hScore() + this.gScore() > that.hScore()
				+ that.gScore()) {
			return 1;
		} else {
			return 0;
		}
	};

	this.keepSearching = function() {
		// console.log(this.cost);
		// if we got to the goal, then stop
		if (this.atGoal()) {
			return false;
		}
		// if we've taken over 100 actions, then stop
		if (this.cost > 100) {
			return false;
		}
		// otherwise, keep alooking
		return true;
	};

	this.atGoal = function() {
		// console.log(JSON.stringify(this._state.position));
		return this.goals.some(function(goal) {
			// console.log(JSON.stringify(goal));
			if (JSON.stringify(this._state.position) == JSON.stringify(goal)) {
				return true;
			}
		}, this);
		return false;
	};
}