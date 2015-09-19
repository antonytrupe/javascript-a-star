//model must contain a method named getActions
//getActions must return an array of objects. those objects must include a property named state, and optionally properties named action and arguments
/**
 * @constructor
 * @param {AI}
 *            ai
 * 
 * @callback ai.getActions
 * @return {Array.<{{state: Object, method: String,arguments:Array}}>}
 * 
 * 
 * @param {ai.getActions}
 *            ai.getActions
 * @param {Function}
 *            ai.gScore - actual cost to this point
 * @param {Function}
 *            ai.hScore - estimated cost from this point to goal
 * @param {Function}
 *            ai.getGoal
 * @param {Function}
 *            ai.setState
 * @param {Function}
 *            ai.getState
 * @param options
 */
function AStar(ai, options) {
	"use strict";

	// the nodes we've already listed, for checking to make sure we don't
	// backtrack
	var closedSet = new Set();
	/**
	 * @type PriorityQueue the nodes we've already visited, in order
	 */
	var closedPriorityQueue = new PriorityQueue('getH', PriorityQueue.MIN_HEAP);

	/**
	 * @type PriorityQueue the nodes we want to visit
	 */
	var openPriorityQueue = new PriorityQueue('getF', PriorityQueue.MIN_HEAP);

	// make sure the model has the right methods for a_star to use
	if (typeof ai === "undefined") {
		throw "no ai provided";
	}
	var requiredAiMembers = [ 'getActions', 'gScore', 'hScore', 'getGoal',
			'setState', 'getState', 'atGoal' ];
	var missingMembers = [];
	requiredAiMembers.forEach(function(method) {
		if (typeof ai[method] === "undefined") {
			missingMembers.push(method);
		}
	});
	if (missingMembers.length !== 0) {
		throw "ai missing attributes: " + JSON.stringify(missingMembers);
	}

	// now initialize some stuff
	var start = new Node({
		'state' : ai.getState()
	});
	start.setG(0);
	start.setH(ai.hScore());

	var goal = new Node({
		'state' : ai.getGoal()
	});
	openPriorityQueue.add(start);

	this.search = function() {

		var loops = 0, MAX_LOOPS = 100;
		while (openPriorityQueue.size() > 0 && loops <= MAX_LOOPS) {
			loops++;
			/**
			 * @type {Node}
			 */
			var q = openPriorityQueue.peek();
			ai.setState(q.getState());

			// the stopping condition(s)
			if (q.isEqual(goal) || ai.atGoal()) {
				return reconstruct_path(q);
			}

			// remove this node from the open list
			openPriorityQueue.poll();
			// add it to the closed lists
			closedSet.add(JSON.stringify(q.getState()));
			closedPriorityQueue.add(q);

			// get actions returns an array of objects
			ai.getActions().forEach(function(n) {
				ai.setState(n.state);
				var neighbor = new Node(n);

				neighbor.setPredecessor(q);
				// get the total cost
				neighbor.setG(ai.gScore(q.getG()));
				neighbor.setH(ai.hScore());

				// check the closed set to make sure we don't
				// backtrack
				if (!closedSet.has(JSON.stringify(neighbor.getState()))) {
					openPriorityQueue.add(neighbor);
				}
			});

		}
		// if we got here, that means we failed to get to the goal
		// so return the best path we did find
		// we may have gotten here because openPriorityQueue is empty
		// or we may have gotten here because we were forced to stop by some
		// other constraint

		console.log('did not get to goal');
		var c = openPriorityQueue.peek();
		if (typeof c === "undefined") {
			console.log('using a node from the closedPriorityQueue');
			c = closedPriorityQueue.peek();
		}
		var path = reconstruct_path(c);
		return path;

	};

	/**
	 * @param {Node}
	 *            q
	 * @return an array of objects that describe the path/actions to take
	 */
	function reconstruct_path(q) {
		var total_path = [];
		/**
		 * @type {Node}
		 */
		var current = q;
		while (typeof current.getPredecessor() !== "undefined") {

			total_path.push(current.getAction());
			current = current.getPredecessor();
		}
		return total_path.reverse();
	}

}

function Node(args) {
	"use strict";
	// f is total cost from start to goal through this node
	this._f;
	// h is the estimated cost from this node to the goal
	this._h;
	// g is the actual cost from start to this node
	this._g;
	//
	this._state = args.state;
	this.predecessor = args.predecessor;
	// action has method and arguments, if any
	// this is the action to get to this state from the predecessor state
	this.action = args.action;

	this.getAction = function() {
		return this.action;
	};

	this.setState = function(__state) {
		this._state = __state;
	};
	this.getState = function() {
		return this._state;
	};

	// g is the actual cost from start to this node
	this.setG = function(__g) {
		this._g = __g;
		this._f = this._g + this._h;
	};

	this.getG = function() {
		return this._g;
	};

	// h is the estimated cost from this node to the goal
	this.setH = function(__h) {
		this._h = __h;
		this._f = this._g + this._h;
	};

	this.getH = function() {
		return this._h;
	};

	// f is total cost from start to goal through this node
	this.getF = function() {
		return this._f;
	};

	this.setPredecessor = function(__p) {
		this.predecessor = __p;
	};
	this.getPredecessor = function() {
		return this.predecessor;
	};
	this.isEqual = function(node) {
		if (!(node instanceof Node)) {
			return false;
		}
		return JSON.stringify(node.getState()) == JSON.stringify(this
				.getState());
	};
}

/**
 * This is an improved Priority Queue data type implementation that can be used
 * to sort any object type. It uses a technique called a binary heap.
 * 
 * For more on binary heaps see: http://en.wikipedia.org/wiki/Binary_heap
 * 
 * @param {String}
 *            criteria The criteria by which to sort the objects. This should be
 *            a property of the objects you're sorting.
 * 
 * @param {Number}
 *            heapType either PriorityQueue.MAX_HEAP or PriorityQueue.MIN_HEAP.
 */
var PriorityQueue = function(criteria, heapType) {
	this.length = 0; // The current length of heap.
	/**
	 * @memberOf PriorityQueue
	 */
	var queue = [];
	var isMax = false;

	// Constructor
	if (heapType == PriorityQueue.MAX_HEAP) {
		isMax = true;
	}

	this.size = function() {
		return this.length;
	};

	/**
	 * Inserts the value into the heap and sorts it.
	 * 
	 * @param value
	 *            The object to insert into the heap.
	 * @memberOf PriorityQueue
	 * @return
	 */
	this.insert = function(value) {
		if (!value.hasOwnProperty(criteria)) {
			throw "Cannot insert " + value
					+ " because it does not have a property by the name of "
					+ criteria + ".";
		}
		queue.push(value);
		this.length++;
		bubbleUp(this.length - 1);
	};

	this.add = this.insert;

	/**
	 * Peeks at the highest priority element.
	 * 
	 * @return the highest priority element
	 */
	this.getHighestPriorityElement = function() {
		return queue[0];
	};

	this.peek = this.getHighestPriorityElement;

	/**
	 * Removes and returns the highest priority element from the queue.
	 * 
	 * @return the highest priority element
	 */
	this.shiftHighestPriorityElement = function() {
		if (this.length === 0) {
			throw ("There are no more elements in your priority queue.");
		} else if (this.length === 1) {
			var onlyValue = queue[0];
			queue = [];
			this.length = 0;
			return onlyValue;
		}
		var oldRoot = queue[0];
		var newRoot = queue.pop();
		this.length--;
		queue[0] = newRoot;
		swapUntilQueueIsCorrect(0);
		return oldRoot;
	};

	this.poll = this.shiftHighestPriorityElement;

	/**
	 * @memberOf PriorityQueue
	 */
	var bubbleUp = function(index) {
		if (index === 0) {
			return;
		}
		var parent = getParentOf(index);
		if (evaluate(index, parent)) {
			swap(index, parent);
			bubbleUp(parent);
		} else {
			return;
		}
	};

	var swapUntilQueueIsCorrect = function(value) {
		var left = getLeftOf(value);
		var right = getRightOf(value);
		if (evaluate(left, value)) {
			swap(value, left);
			swapUntilQueueIsCorrect(left);
		} else if (evaluate(right, value)) {
			swap(value, right);
			swapUntilQueueIsCorrect(right);
		} else if (value == 0) {
			return;
		} else {
			swapUntilQueueIsCorrect(0);
		}
	};

	var swap = function(self, target) {
		var placeHolder = queue[self];
		queue[self] = queue[target];
		queue[target] = placeHolder;
	};

	var evaluate = function(self, target) {
		if (queue[target] === undefined || queue[self] === undefined) {
			return false;
		}

		var selfValue;
		var targetValue;

		// Check if the criteria should be the result of a function call.
		if (typeof queue[self][criteria] === 'function') {
			selfValue = queue[self][criteria]();
			targetValue = queue[target][criteria]();
		} else {
			selfValue = queue[self][criteria];
			targetValue = queue[target][criteria];
		}

		if (isMax) {
			if (selfValue > targetValue) {
				return true;
			} else {
				return false;
			}
		} else {
			if (selfValue < targetValue) {
				return true;
			} else {
				return false;
			}
		}
	};

	var getParentOf = function(index) {
		return Math.floor(Math.floor((index - 1) / 2));
	};

	var getLeftOf = function(index) {
		return index * 2 + 1;
	};

	var getRightOf = function(index) {
		return index * 2 + 2;
	};
};

// Constants
PriorityQueue.MAX_HEAP = 0;
PriorityQueue.MIN_HEAP = 1;