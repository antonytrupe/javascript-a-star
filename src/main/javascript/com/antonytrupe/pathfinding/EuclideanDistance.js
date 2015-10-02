/**
 * @constructor
 * @param {SquareGridMap}
 *          _state
 * @param {Object}
 *          goal
 */
function EuclideanDistance(_state, goal) {
    // private, use getter and setter methods
    this._state = _state;

    this.goal = goal;

    this._initial_state = _state;

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

                            actions.push({
                                'state': new SquareGridMap(this._state.map, {
                                    'x': this._state.position.x + x,
                                    'y': this._state.position.y + y
                                }),
                                'action': {
                                    'method': direction
                                },
                                'cost': 1
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
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    };

    // this needs the previous gscore and the current action
    this.gScore = function(previousCost, action) {
        // need to know if this is a diagonal move or not
        var cost = 1;
        if (action.method.length == 2) {
            cost = 1.5;
        }
        return previousCost + cost;
        // some models will want to only compare the initial state to the
        // current state, and not take into account how many actions it has
        // taken to get to the current state
        // some models will care about both
    };

    this.keepSearching = function() {
        return true;
    };

    this.atGoal = function() {
        return JSON.stringify(this._state.position) == JSON
                .stringify(this.goal);
    };
    this.setState = function(state) {
        this._state = state;
        return this;
    };
    this.getState = function() {
        return this._state;
    };
}