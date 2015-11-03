/**
 * @constructor
 * @param {SquareGridMap}
 *            _state
 * @param {Object}
 *            goal
 * @param cost
 */
function EuclideanDistanceModel(_state, goal, cost) {

	/**
	 * 
	 * @param {SquareGridMap}
	 *            that
	 */
	this._state = _state;

	this.goal = goal;

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
							if (x !== 0 && y !== 0) {
								cost = 1.5;
							} else {
								cost = 1;
							}

							if (x == -1) {
								direction = 'N';
								;
							} else if (x == 1) {
								direction = 'S';
							}

							if (y == -1) {
								direction += 'W';

							} else if (y == 1) {
								direction += 'E';
							}

							// console.log(direction);
							// console.log(cost);

							actions.push({
								'model' : new EuclideanDistanceModel(
										new SquareGridMap(this._state.map, {
											'x' : this._state.position.x + x,
											'y' : this._state.position.y + y
										}), this.goal, this.cost + cost),
								'action' : {
									'method' : direction
								},
								'cost' : 1
							});
						}
					}
				}
			}
		}
		return actions;
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

	this.gScore = function() {
		return this.cost;
	};

	this.hScore = function() {
		var dx = Math.abs(this.goal.x - this._state.position.x);
		var dy = Math.abs(this.goal.y - this._state.position.y);
		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	};

	this.keepSearching = function() {
		return !this.atGoal();
	};

	this.atGoal = function() {
		return JSON.stringify(this._state.position) == JSON
				.stringify(this.goal);
	};

}