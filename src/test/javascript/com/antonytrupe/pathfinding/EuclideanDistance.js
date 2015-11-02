QUnit.test("EuclideanDistance", function(assert) {
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

	var model = new EuclideanDistanceModel(map, goal, 0);
	assert.equal(model._state.position, start, "set start");
	assert.equal(model.goal, goal, "set goal");

	var aStar = new AStar(model);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'S'
	},
	// down
	{
		'method' : 'SE'
	},
	// right
	{
		'method' : 'NE'
	},
	// right
	{
		'method' : 'N'
	} ]);
});
/*
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

	var EuclideanDistanceAI = new EuclideanDistance(map, goal);
	assert.equal(EuclideanDistanceAI._state.position, start, "set start");
	assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(EuclideanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'S'
	},
	// down
	{
		'method' : 'SW'
	},
	// right
	{
		'method' : 'NW'
	},
	// right
	{
		'method' : 'N'
	} ]);
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

	var EuclideanDistanceAI = new EuclideanDistance(map, goal);
	assert.equal(EuclideanDistanceAI._state.position, start, "set start");
	assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(EuclideanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'N'
	},
	// down
	{
		'method' : 'NW'
	},
	// right
	{
		'method' : 'SW'
	},
	// right
	{
		'method' : 'S'
	} ]);
});

QUnit.test("3x3:no path, top left to bottom right", function(assert) {
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

	var EuclideanDistanceAI = new EuclideanDistance(map, goal);
	assert.equal(EuclideanDistanceAI._state.position, start, "set start");
	assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(EuclideanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'S'
	},
	// down
	{
		'method' : 'S'
	} ]);
});

QUnit.test("3x3:no obstacles, top left to bottom right", function(assert) {
	var start = {
		'x' : 0,
		'y' : 0
	};
	var goal = {
		'x' : 2,
		'y' : 2
	};
	var map = new SquareGridMap([ [ " ", " ", " " ], [ " ", " ", " " ],
			[ " ", "|", " " ], ], start);

	var EuclideanDistanceAI = new EuclideanDistance(map, goal);
	assert.equal(EuclideanDistanceAI._state.position, start, "set start");
	assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(EuclideanDistanceAI);
	// return;
	assert.deepEqual(aStar.getPath(), [

	// down
	{
		'method' : 'SE'
	},
	// down
	{
		'method' : 'SE'
	} ]);
});
*/