//http://localhost:8080/webDefault/test/test.html

QUnit.test("hello test", function(assert) {
	assert.ok(1 == "1", "Passed!");
});

function O(value) {
	this.value = value;

}
O.compareTo = function(one, two) {
	if (one.value < two.value) {
		return -1;
	} else if (one.value == two.value) {
		return 0;
	} else if (one.value >= two.value) {
		return 1;
	}
};

QUnit.test("example PriorityQueue.MIN_HEAP", function(assert) {
	var p = new PriorityQueue(O.compareTo);

	var object1 = new O(5);

	object2 = new O(10);
	object3 = new O(20);
	object4 = new O(15);

	p.insert(object1);
	assert.equal(p.peek().value, object1.value, 'peek 5, one element');

	p.insert(object2);
	assert.equal(p.peek().value, object1.value, 'peek 5, two elements');

	p.insert(object3);
	assert.equal(p.peek().value, object1.value, 'peek 5, three elements');

	p.insert(object4);
	assert.equal(p.peek().value, object1.value, 'peek 5, 4 elements');

	assert.equal(p.peek().value, object1.value, 'peek 5');
	assert.equal(p.shiftHighestPriorityElement().value, object1.value,
			'shift 5');

	assert.equal(p.peek().value, object2.value, 'peek 10');
	assert.equal(p.shiftHighestPriorityElement().value, object2.value,
			'shift 10');

	assert.equal(p.peek().value, object4.value, 'peek 15');
	assert.equal(p.shiftHighestPriorityElement().value, object4.value,
			'shift 15');

	assert.equal(p.peek().value, object3.value, 'peek 20');
	assert.equal(p.shiftHighestPriorityElement().value, object3.value,
			'shift 20');

	assert.equal(p.length, 0, 'empty');

});

QUnit.test("example 1", function(assert) {
	var p = new PriorityQueue(O.compareTo);

	var object1 = new O(10);
	var object2 = new O(5)

	p.insert(object1);
	assert.equal(p.peek(), object1);

	p.insert(object2);
	assert.equal(p.peek(), object2);

	assert.equal(p.shiftHighestPriorityElement(), object2);

});

QUnit.test("reverse PriorityQueue.MIN_HEAP", function(assert) {
	var p = new PriorityQueue(O.compareTo);

	var object1 = {};
	var object2 = {};
	var object3 = {};
	// var object4 = {};

	var object1 = new O(20);

	var object2 = new O(15);

	var object3 = new O(10);

	p.add(object1);
	assert.equal(p.peek(), object1);
	p.add(object2);
	assert.equal(p.peek(), object2);
	p.add(object3);
	// p.insert(object4);

	// assert.equal(p.peek(), object4);
	// assert.equal(p.shiftHighestPriorityElement(), object4);

	assert.equal(p.peek(), object3);
	assert.equal(p.shiftHighestPriorityElement(), object3);

	assert.equal(p.peek(), object2);
	assert.equal(p.shiftHighestPriorityElement(), object2);

	assert.equal(p.peek(), object1);
	assert.equal(p.shiftHighestPriorityElement(), object1);

	assert.equal(p.length, 0);

});

QUnit.test("PriorityQueue.MIN_HEAP", function(assert) {

	var pq = new PriorityQueue(O.compareTo);
	var zero = new O(10);

	// console.log(zero);

	var one = new O(20);
	// console.log(one);

	var two = new O(30);

	// console.log(two);

	// console.log('adding first element');
	pq.add(two);
	// console.log(pq);
	assert.equal(pq.peek().value, 30, "make sure 30 is on the top");

	// console.log('adding second element');
	pq.add(one);
	// console.log(pq);
	// console.log(pq.peek());
	assert.equal(pq.peek().value, 20, "make sure 20 is on the top");

	// console.log('adding third element');
	pq.add(zero);
	// console.log(pq);

	assert.equal(pq.peek().value, 10, "make sure 10 is on the top");
});

QUnit.test("multi value sorting", function(assert) {
	// console.log(o);
	function o(_a, _b) {
		this.a = _a;
		this.b = _b;

	}
	o.compareTo = function(one, two) {
		if (one.a < two.a) {
			return -1;
		} else if (one.a > two.a) {
			return 1;
		} else {
			if (one.b < two.b) {
				return -1;
			} else if (one.b > two.b) {
				return 1;
			}
		}
		return 0;
	};

	var pq = new PriorityQueue(o.compareTo);

	var one = new o(1, 1);
	var two = new o(1, 0);

	var three = new o(0, 1);
	pq.add(one);
	assert.equal(pq.peek(), one, 'single node');

	pq.add(two);
	assert.equal(pq.peek(), two, '2 nodes');

	pq.add(three);
	assert.equal(pq.peek(), three, '3 nodes');

});

QUnit.test("model validation", function(assert) {
	assert.throws(function() {
		new AStar();
	}, "no model provided", "no model provided");
	assert.throws(function() {
		new AStar({});
	}, /model missing attributes:/, "model missing attributes");
	assert.ok(new AStar({
		'getActions' : function() {
			// mock
		},

		'atGoal' : function() {
			return false;
		},
		'keepSearching' : function() {
			return false;
		},

		'getState' : function() {
			// mock
		},

		'setState' : function() {
			// mock
		},
		'closedPriorityQueueComparator' : function() {
			// mock
		},

		'openPriorityQueueComparator' : function() {
			// mock
		}

	}), "mock model");
});

QUnit.test("time constraint",
		function(assert) {
			var foo = true;
			function RandomIntegerModel() {
				this.state;
				this.start = new Date();
				this.getActions = function() {
					// mock
					if (foo) {
						foo = false;
						return [ {
							'state' : Math.random(),
							'action' : ''
						}, {
							'state' : Math.random(),
							'action' : ''
						} ];
					} else {
						return [ {
							'state' : Math.random(),
							'action' : ''
						} ];
					}
				};

				this.getState = function() {
					return this.state;
				};

				this.setState = function(_state) {
					this.state = _state;
				}

				this.atGoal = function() {
					return false;
				};
				this.keepSearching = function() {
					// console.log(Date.now() - this.start);
					return Date.now() - this.start <= 2000;
				};

				this.closedPriorityQueueComparator = function() {
					// mock
					return 1;
				};
				this.openPriorityQueueComparator = function() {
					// mock
					return 1;
				}
			}

			assert.ok(new AStar(new RandomIntegerModel()).getPath(),
					"time constraint");
		});

QUnit.test("2 node/one step model search", function(assert) {

	function IntegerStateModel(state) {

		this._state = state;

		this.getActions = function() {
			// mock
			if (this._state == 0) {
				return [ {
					'action' : 1,
					'state' : 1
				} ];
			}
			return [];
		};

		this.getState = function() {
			return this._state;
		};

		this.setState = function(state) {
			console.log(state);
			this._state = state;
		};

		this.atGoal = function() {
			return this._state === 1;
		};
		this.keepSearching = function() {
			return !this.atGoal();
		};

		this.closedPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
		this.openPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
	}

	assert.deepEqual(new AStar(new IntegerStateModel(0)).getPath(), [ 1 ],
			"2 node/one step model search");
});

QUnit.test("3 node/one step/dead-end model search", function(assert) {

	function IntegerStateModel(state) {
		this._state = state;
		this.getActions = function() {
			// mock
			if (this._state == 0) {
				return [ {
					'action' : 1,
					'state' : 1
				}, {
					'action' : 2,
					'state' : 2
				} ];
			}
			return [];
		};

		this.getState = function() {
			return this._state;
		};

		this.setState = function(state) {
			this._state = state;
		};

		this.atGoal = function() {
			return this._state === 2;
		};
		this.keepSearching = function() {
			return true;
		};

		this.closedPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
		this.openPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};

	}

	assert.deepEqual(new AStar(new IntegerStateModel(0)).getPath(), [ 2 ],
			"3 node/one step/dead-end model search");
});

QUnit.test("4 node/2 step/dead-end model search", function(assert) {
	function State(_node) {
		this.node = _node;
	}
	var zero = new State(0);
	var one = new State(1);
	var two = new State(2);
	var three = new State(3);

	function AI(_state) {
		// private, use getter and setter methods
		this._state = _state;

		this.setState = function(state) {
			this._state = state;
		};

		this.getState = function() {
			return this._state;
		};

		this.getActions = function() {

			// mock
			switch (this._state.node) {
			case 0:
				return [ {
					'action' : one,
					'state' : one
				}, {
					'action' : two,
					'state' : two
				} ];
			case 2:

				return [ {
					'action' : three,
					'state' : three
				} ];
			}
			return [];
		};

		this.atGoal = function() {
			return this._state.node === three.node;
		};
		this.keepSearching = function() {
			return true;
		};

		this.closedPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
		this.openPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
	}
	// console.log([ { 'node' : 0 }, { 'node' : 2 }, { 'node' : 3 } ]);

	// console.log(new AStar(new AI(zero)));
	// return;
	assert.deepEqual(new AStar(new AI(zero)).getPath(), [ two, three ],
			"4 node/2 step/dead-end model search");
});

QUnit.test("diamond:first path is shorter", function(assert) {

	function State(_node) {
		this.node = _node;
	}
	var zero = new State(0);
	var one = new State(1);
	var two = new State(2);
	var three = new State(3);

	// a mock up of thediskgame.AI
	// the AI is responsible for creating new world/game states
	function AI(state) {
		this._state = state;

		this.getState = function() {
			return this._state;
		};
		this.setState = function(state) {
			this._state = state;
		};
		// returns an array of objects
		// each object contains 3 attributes: the 'action' to get to the new
		// state, the 'args' for the function in the first argument,
		// and the 'state' resulting from calling the 'action' with the 'args'
		this.getActions = function() {
			// mock
			switch (this._state.node) {
			case 0:

				return [ {
					'action' : one,
					'state' : one
				}, {
					'action' : two,
					'state' : two
				} ];
			case 1:
			case 2:
				return [ {
					'action' : three,
					'state' : three
				} ];

			default:
				return [];
			}
		};

		this.atGoal = function() {
			return this._state.node === three.node;
		};
		this.keepSearching = function() {
			return !this.atGoal();
		};

		this.closedPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};
		this.openPriorityQueueComparator = function(that) {
			// mock
			return 1;
		};

	}
	assert.deepEqual(new AStar(new AI(zero)).getPath(), [ one, three ],
			"diamond:first path is shorter");
});

QUnit.test("diamond:second path is shorter", function(assert) {

	function State(_node) {
		this.node = _node;
	}
	var zero = new State(0);
	var one = new State(1);
	var two = new State(2);
	var three = new State(3);

	function GraphModel(state) {
		var $this = this;
		this._state = state;

		this.getState = function() {
			return this._state;
		};
		this.setState = function(state) {
			this._state = state;
		};

		this.getActions = function() {
			// mock
			switch (this._state.node) {
			case 0:
				return [ {
					'action' : one,
					'state' : one
				}, {
					'action' : two,
					'state' : two
				} ];

				// both nodes 1 and 2 go to 3
			case 1:
			case 2:
				return [ {
					'action' : three,
					'state' : three
				} ];
			default:
				return [];
			}
		};

		// return 1 if this has a lower cost
		this.closedPriorityQueueComparator = function(one, two) {
			// mock
			// console.log(this);
			// console.log(this._state.node);
			switch (one.state.node) {
			case 0:
				return 1;
			case 1:
				return 1;
			case 2:
				return -1;
			}
			return 1;
		};

		this.openPriorityQueueComparator = function(one, two) {
			// mock
			console.log(one);
			console.log(two);
			console.log(this);
			console.log($this);
			return $this.closedPriorityQueueComparator(one, two);
		};
		this.keepSearching = function() {
			return !this.atGoal();
		};
		this.atGoal = function() {
			return this._state.node === three.node;
		};

	}

	assert.deepEqual(new AStar(new GraphModel(zero)).getPath(), [ two, three ],
			"diamond:second path is shorter");
});

QUnit.test("no path to goal", function(assert) {

	function State(_node) {
		this.node = _node;
	}
	var zero = new State(0);
	var one = new State(1);
	var two = new State(2);
	var three = new State(3);
	var four = new State(4);

	function GraphModel(state) {
		this._state = state;
		this.getState = function() {
			return this._state;
		};
		this.setState = function(state) {
			this._state = state;
		};
		this.getActions = function() {
			// mock
			switch (this._state.node) {
			case 0:
				return [ {
					'action' : one,
					'state' : new GraphModel(one)
				}, {
					'action' : two,
					'state' : new GraphModel(two)
				} ];

				// both nodes 1 and 2 go to 3
			case 1:
			case 2:
				return [ {
					'action' : three,
					'state' : new GraphModel(three)
				} ];
			default:
				return [];
			}
		};
		// h, heuristic, estimated cost from the node to the goal
		this.hScore = function() {
			// console.log(this._state.node);
			switch (this._state.node) {
			case 0:
				return 10;
			case 1:
				return 5;
			case 2:
				return 4;
			case 3:
				return 1;
			}
			// mock
		};

		// actual cost from start to current node
		this.gScore = function() {
			// mock
			switch (this._state.node) {
			case 0:
				return 0;
			case 1:
				return 5;
			case 2:
				return 4;
			case 3:
				return 1;
			}
		};

		// in order of estimated cost from the node to the goal
		this.closedPriorityQueueComparator = function(one, two) {
			console.log(one);
			console.log(two);
			if (one.getState().hScore() < two.getState().hScore()) {
				return -1;
			} else if (one.getState().hScore() > two.getState().hScore()) {
				return 1;
			} else {
				return 0;
			}
		};

		// in order of actual cost from start to current node plus estimated
		// cost to goal
		// one and two are
		this.openPriorityQueueComparator = function(one, two) {
			console.log(one);
			console.log(two);
			if (one.getState().hScore() + one.getState().gScore() < two
					.getState().hScore()
					+ two.getState().gScore()) {
				return -1;
			} else if (one.getState().hScore() + one.getState().gScore() > two
					.getState().hScore()
					+ two.getState().gScore()) {
				return 1;
			} else {
				return 0;
			}
		};

		this.keepSearching = function() {
			return true;
		};
		this.atGoal = function() {
			return this._state.node === four.node;
		};

	}
	assert.deepEqual(new AStar(new GraphModel(zero)).getPath(), [ two, three ],
			"no path to goal");
});