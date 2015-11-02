QUnit.test("ManhattanDistance", function(assert) {
	assert.ok(1 == "1", "Passed!");
});

QUnit.test("3x3:U shape, top left to top right", function(assert) {
	var start = {
		'x' : 0,
		'y' : 0
	};
	var goal = {
		'x' : 0,
		'y' : 2
	};
	var map = new SquareGridMap([ [ " ", "|", " " ], [ " ", "|", " " ],
			[ " ", " ", " " ], ], start);

	var manhattanDistanceModel = new ManhattanDistanceModel(map, goal, 0);
	assert.equal(manhattanDistanceModel._state.position, start, "set start");
	assert.equal(manhattanDistanceModel.goal, goal, "set goal");

	var aStar = new AStar(manhattanDistanceModel);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'down'
	},
	// down
	{
		'method' : 'down'
	},
	// right
	{
		'method' : 'right'
	},
	// right
	{
		'method' : 'right'
	},
	// up
	{
		'method' : 'up'
	},
	// up
	{
		'method' : 'up'
	}, ]);
});

QUnit.test("3x3:U shape, top right to top left", function(assert) {
	var start = {
		'x' : 0,
		'y' : 2
	};
	var goal = {
		'x' : 0,
		'y' : 0
	};
	var map = new SquareGridMap([ [ " ", "|", " " ], [ " ", "|", " " ],
			[ " ", " ", " " ], ], start);

	var manhattanDistanceAI = new ManhattanDistanceModel(map, goal);
	assert.equal(manhattanDistanceAI._state.position, start, "set start");
	assert.equal(manhattanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(manhattanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'down'
	},
	// down
	{
		'method' : 'down'
	},
	// right
	{
		'method' : 'left'
	},
	// right
	{
		'method' : 'left'
	},
	// up
	{
		'method' : 'up'
	},
	// up
	{
		'method' : 'up'
	}, ]);
});

QUnit.test("3x3:n shape, bottom right to bottom left", function(assert) {
	var start = {
		'x' : 2,
		'y' : 2
	};
	var goal = {
		'x' : 2,
		'y' : 0
	};
	var map = new SquareGridMap([ [ " ", " ", " " ], [ " ", "|", " " ],
			[ " ", "|", " " ], ], start);

	var manhattanDistanceAI = new ManhattanDistanceModel(map, goal);
	assert.equal(manhattanDistanceAI._state.position, start, "set start");
	assert.equal(manhattanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(manhattanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'up'
	},
	// down
	{
		'method' : 'up'
	},
	// right
	{
		'method' : 'left'
	},
	// right
	{
		'method' : 'left'
	},
	// up
	{
		'method' : 'down'
	},
	// up
	{
		'method' : 'down'
	}, ]);
});

// TODO
QUnit.test("3x3:no path, top right to top left", function(assert) {
	var start = {
		'x' : 0,
		'y' : 0
	};
	var goal = {
		'x' : 2,
		'y' : 2
	};
	var map = new SquareGridMap([ [ " ", "|", " " ], [ " ", "|", " " ],
			[ " ", "|", " " ], ], start);

	var manhattanDistanceAI = new ManhattanDistanceModel(map, goal);
	assert.equal(manhattanDistanceAI._state.position, start, "set start");
	assert.equal(manhattanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(manhattanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	]);
});