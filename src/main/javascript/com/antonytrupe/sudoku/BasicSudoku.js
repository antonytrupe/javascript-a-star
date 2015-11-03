/**
 * @constructor
 * @param {SquareGridMap}
 *            _state
 */
function BasicSudoku(_state) {
	// private, use getter and setter methods
	this._state = _state;

	/**
	 * needed for AStar. returns an array of instances of the world state,
	 * SquareGridMap in this case
	 * 
	 * @returns a list of objects that have model and action attributes
	 */
	this.getActions = function() {
		var actions = [];

		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				// if this spot is empty
				if (this._state.map[x][y] == 0) {
					// then get the numbers it could be
					for (var i = 1; i <= 9; i++) {
						var newMap = JSON
								.parse(JSON.stringify(this._state.map));
						newMap[x][y] = i;
						if (this.isValid(newMap)) {
							actions.push({
								'model' : new BasicSudoku(new SudokuBoard(
										newMap)),
								'action' : i + ' @ [' + x + ',' + y + ']'
							});
						}
						// console.log(i + ' in [' + x + ',' + y + ']');
					}
					return actions;
				}
			}
		}

		return actions;
	};

	/**
	 * required for AStar
	 * 
	 * @returns {Number} estimate to goal, the number of empty cells in this
	 *          case
	 */
	this.hScore = function() {
		return this.emptyCellCount();
	};

	/**
	 * 
	 * @param previousCost
	 * @param action
	 * @returns {Number} actual cost from initial state to this state, in this
	 *          case there is no cost for a valid move, and max cost for an
	 *          invalid move
	 */
	this.gScore = function(previousCost, action) {
		// return 1 if the board is invalid otherwise return 0
		return this.isValid(this._state.map) ? 0 : 99;
	};

	this.isValid = function(map) {
		// walk each row
		for (var x = 0; x < 9; x++) {
			var seen = new Set();
			for (var y = 0; y < 9; y++) {
				if (map[x][y] != 0) {
					if (seen.has(map[x][y])) {
						// console.log('found ' + this._state.map[x][y]
						// + ' in row ' + x);
						return false;
					}
					seen.add(map[x][y]);
				}
			}
		}

		// walk each column
		for (var y = 0; y < 9; y++) {
			var seen = new Set();
			for (var x = 0; x < 9; x++) {
				if (map[x][y] != 0) {
					if (seen.has(map[x][y])) {
						// console.log('found ' + this._state.map[x][y]
						// + ' in column ' + y);
						return false;
					}
					seen.add(map[x][y]);
				}
			}
		}

		// walk each box
		for (var bX = 0; bX < 9; bX += 3) {
			for (var bY = 0; bY < 9; bY += 3) {
				var seen = new Set();
				for (var x = 0; x < 3; x++) {
					for (var y = 0; y < 3; y++) {

						if (map[bX + x][bY + y] != 0) {
							if (seen.has(map[bX + x][bY + y])) {
								// console.log('found a dup in a box');
								return false;
							}
							seen.add(map[bX + x][bY + y]);
						}

					}
				}

			}
		}

		// console.log('found no dups');
		return true;
	};

	this.emptyCellCount = function() {
		var count = 0;
		for (var x = 0; x < 9; x++) {
			for (var y = 0; y < 9; y++) {
				if (this._state.map[x][y] == 0) {
					count++;
				}
			}
		}
		// return the number of empty cells
		return count;

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
		return !this.atGoal();
	};

	this.atGoal = function() {
		return this.emptyCellCount() == 0 && this.isValid(this._state.map);
	};

}