QUnit.test("hello test", function(assert) {
	assert.ok(1 == "1", "Passed!");
});

QUnit.test("4x4: 2 goals", function(assert) {
	//top left
	var start = {
		'x' : 0,
		'y' : 0
	};

	// top right
	var goal1 = {
		'x' : 0,
		'y' : 3
	};
	// bottom left
	var goal2 = {
		'x' : 3,
		'y' : 0
	};

	var map = new SquareGridMap([ [ " ", "|", "|", " " ],
	                              [ " ", " ", " ", " " ], 
	                              [ "|", "|", "|", " " ],
	                              [ " ", " ", " ", " " ], ], start);

	var model = new EuclideanDistanceMultiModel(map, [ goal1, goal2 ], 0);
	assert.equal(model._state.position, start, "set start");
	// assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(model);
	// return;
	assert.deepEqual(aStar.getPath(), [
	//
	{
		'method' : 'SE'
	},
	//
	{
		'method' : 'E'
	},
	//
	{
		'method' : 'NE'
	}, ]);
});