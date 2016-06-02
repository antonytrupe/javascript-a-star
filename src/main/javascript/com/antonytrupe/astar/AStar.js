/**
 * @class
 * @param {Object}
 *            model - object that represents the world and provides information
 *            to AStar
 * @param {Function}
 *            model.getActions - return a list of objects that have an
 *            attributes state and method: [{'state':'1,'action':'jump'}...]
 * @param {Function}
 *            model.gScore - return actual cost to this state from initial state
 * @param {Function}
 *            model.hScore - return estimated cost from current state to goal
 * @param {Function}
 *            model.atGoal - return false to keep searching, true to stop
 *            searching
 * @param {Function}
 *            model.setModel - restore the model to a specific state
 * @param {Function}
 *            model.getModel - return the current state of the model
 */
function AStar(model) {
	"use strict";

	// make sure we got a model
	if (typeof model === "undefined") {
		throw "no model provided";
	}

	// make sure the model has the right methods for a_star to use
	var requiredModelMembers = [ 'getState', 'setState', 'getActions',
			'atGoal', 'keepSearching', 'closedPriorityQueueComparator',
			'openPriorityQueueComparator' ];
	var missingMembers = [];
	requiredModelMembers.forEach(function(method) {
		if (typeof model[method] === "undefined") {
			missingMembers.push(method);
		}
	});
	if (missingMembers.length !== 0) {
		throw "model missing attributes: " + JSON.stringify(missingMembers);
	}

	/**
	 * @type {Set} closedSet - the nodes we've already listed, for checking to
	 *       make sure we don't backtrack
	 */
	var closedSet = new Set();
	/**
	 * @type {PriorityQueue} - the nodes we've already visited, in order of
	 *       estimated remaining cost to goal
	 */
	var closedPriorityQueue = new PriorityQueue(
			model.closedPriorityQueueComparator);

	/**
	 * @type {PriorityQueue} - the nodes we want to visit, in order of actual
	 *       cost and estimated remaining cost
	 */
	var openPriorityQueue = new PriorityQueue(model.openPriorityQueueComparator);

	// now initialize some stuff
	var start = new Node({
		'state' : model.getState()
	});
	// start.setG(0);
	// start.setH(model.hScore());

	openPriorityQueue.add(start);

	/**
	 * @memberOf AStar
	 * @return
	 */
	function process() {
		// var loops = 0, MAX_LOOPS = 10000;
		// && loops <= MAX_LOOPS
		while (openPriorityQueue.size() > 0 && model.keepSearching()) {
			// loops++;
			/**
			 * @type {Node}
			 */
			var q = openPriorityQueue.peek();
			model.setState(q.getState());

			// console.log(q.action);

			// the stopping condition(s)
			if (model.atGoal()) {
				// console.log('got to goal or some other constraint');
				return q;
			}

			// remove this node from the open list
			openPriorityQueue.poll();
			// add it to the closed lists
			closedSet.add(JSON.stringify(q.getState()));
			closedPriorityQueue.add(q);

			// get actions returns an array of objects
			model.getActions().forEach(
			/**
			 * @param {Node}
			 *            n
			 */
			function(n) {
				// console.log(n);
				// model.setState(n.state);
				var neighbor = new Node(n);

				neighbor.setPredecessor(q);
				// get the total cost
				// neighbor.setG(q.getModel().gScore(q.getG(), n.action));
				// neighbor.setH(q.getModel().hScore());

				// check the closed set to make sure we don't
				// backtrack
				if (!closedSet.has(JSON.stringify(neighbor.getState()))) {
					openPriorityQueue.add(neighbor);
				}
			});

		}
		/**
		 * if we got here, that means we failed to get to the goal. we may have
		 * gotten here because openPriorityQueue is empty(no solution) or we may
		 * have gotten here because we were forced to stop by some other
		 * constraint
		 */
		var c = openPriorityQueue.peek();
		if (typeof c === "undefined") {
			c = closedPriorityQueue.peek();
		}
		// return the best path we did find
		// console.log('got to a constraint');
		return c;
	}

	/**
	 * @returns best state given constraints
	 */
	this.getSolution = function() {
		return process().getState();
	};

	/**
	 * @returns list of actions to get to the best state
	 */
	this.getPath = function() {
		return reconstruct_path(process());
	};

	/**
	 * @memberOf AStar
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

	this.state = args.state;
	this.predecessor = args.predecessor;
	// action has method and arguments, if any
	// this is the action to get to this state from the predecessor state
	this.action = args.action;

	this.getAction = function() {
		return this.action;
	};

	this.getState = function() {
		return this.state;
	};

	this.setPredecessor = function(__p) {
		this.predecessor = __p;
	};
	this.getPredecessor = function() {
		return this.predecessor;
	};
}

/**
 * https://github.com/prettymuchbryce/easystarjs/blob/master/src/priority-queue.js
 * This is an improved Priority Queue data type implementation that can be used
 * to sort any object type. It uses a technique called a binary heap.
 * 
 * For more on binary heaps see: http://en.wikipedia.org/wiki/Binary_heap
 * 
 * @class
 * @param {String}
 *            criteria The criteria by which to sort the objects. This should be
 *            a property of the objects you're sorting.
 * 
 * @param {Number}
 *            heapType either PriorityQueue.MAX_HEAP or PriorityQueue.MIN_HEAP.
 */
function PriorityQueue(comparator) {

	// console.log(comparator);

	/**
	 * The current length of queue.
	 * 
	 * @memberOf PriorityQueue
	 */
	this.length = 0;
	/**
	 * @memberOf PriorityQueue
	 * @type Array
	 */
	var queue = [];

	/**
	 * @memberOf PriorityQueue
	 * @return {number}
	 */
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

		// if (!(value.hasOwnProperty('compareTo') || (typeof comparator !==
		// "undefined" && value
		// .hasOwnProperty(comparator)))) {
		// throw "Cannot insert " + value
		// + " because it does not have a property by the name of "
		// + 'compareTo' + ".";
		// }
		queue.push(value);
		this.length++;
		bubbleUp(this.length - 1);
	};

	/**
	 * @memberOf PriorityQueue
	 */
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

	/**
	 * @memberOf PriorityQueue
	 */
	this.poll = this.shiftHighestPriorityElement;

	/**
	 * @memberOf PriorityQueue
	 */
	var bubbleUp = function(index) {
		if (index === 0) {
			return;
		}
		var parent = getParentOf(index);
		// TODO evaluate
		if (evaluate(index, parent) === -1) {
			swap(index, parent);
			bubbleUp(parent);
		} else {
			return;
		}
	};

	/**
	 * @memberOf PriorityQueue
	 */
	var swapUntilQueueIsCorrect = function(value) {
		var left = getLeftOf(value);
		var right = getRightOf(value);
		// evaluate
		if (evaluate(left, value) === -1) {
			swap(value, left);
			swapUntilQueueIsCorrect(left);
			// evaluate
		} else if (evaluate(right, value) === -1) {
			swap(value, right);
			swapUntilQueueIsCorrect(right);
		} else if (value === 0) {
			return;
		} else {
			swapUntilQueueIsCorrect(0);
		}
	};

	/**
	 * @memberOf PriorityQueue
	 */
	var swap = function(self, target) {
		var placeHolder = queue[self];
		queue[self] = queue[target];
		queue[target] = placeHolder;
	};

	/**
	 * @memberOf PriorityQueue
	 */
	var evaluate = function(self, target) {
		if (queue[target] === undefined || queue[self] === undefined) {
			return false;
		}

		var selfValue;
		var targetValue;
		// console.log(comparator);
		// console.log(queue[self]);
		// console.log(queue[target]);
		// TODO figure out how to set the right this for the call to the
		// comparator
		return comparator(queue[self], queue[target]);

	};

	/**
	 * @memberOf PriorityQueue
	 */
	var getParentOf = function(index) {
		return Math.floor(Math.floor((index - 1) / 2));
	};

	/**
	 * @memberOf PriorityQueue
	 */
	var getLeftOf = function(index) {
		return index * 2 + 1;
	};

	/**
	 * @memberOf PriorityQueue
	 */
	var getRightOf = function(index) {
		return index * 2 + 2;
	};
};