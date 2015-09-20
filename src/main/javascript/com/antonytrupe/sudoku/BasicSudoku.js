/**
 * @constructor
 * @param {SquareGridMap}
 *            _state
 */
function BasicSudoku(_state) {
	// private, use getter and setter methods
	this._state = _state;

	this._initial_state = _state;

	// returns an array of instances of the world state, SquareGridMap in this
	// case
	this.getActions = function() {
		var actions = [];

		// TODO this creates too many actions
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
								'state' : new SudokuBoard(newMap),
								'action' : i + ' in [' + x + ',' + y + ']'
							});
						}
						// console.log(i + ' in [' + x + ',' + y + ']');
					}
					return actions;
					// get the numbers in the row
					// get the numbers in the column
					// get the numbers in the box
				}
			}
		}

		return actions;
	};

	this.hScore = function() {
		return this.emptyCellCount();
	};

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

	this.getGoal = function() {
		return null;
	};

	this.atGoal = function() {
		return this.emptyCellCount() == 0 && this.isValid(this._state.map);
	};
	this.setState = function(state) {
		this._state = state;
		return this;
	};
	this.getState = function() {
		return this._state;
	};
}