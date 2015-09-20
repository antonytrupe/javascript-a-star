QUnit.test("4x4: 2 goals", function(assert) {
	var start = {
		'x' : 0,
		'y' : 0
	};
	var goal1 = {
		'x' : 0,
		'y' : 3
	};

	var goal2 = {
		'x' : 3,
		'y' : 0
	};

	var map = new SquareGridMap([ [ " ", "|", "|", " " ],
	                              [ " ", " ", " ", " " ], 
	                              [ "|", "|", "|", " " ],
	                              [ " ", " ", " ", " " ], ], start);

	var EuclideanDistanceAI = new EuclideanDistanceMulti(map, [ goal1, goal2 ]);
	assert.equal(EuclideanDistanceAI._state.position, start, "set start");
	//assert.equal(EuclideanDistanceAI.goal, goal, "set goal");

	var aStar = new AStar(EuclideanDistanceAI);
	// return;
	assert.deepEqual(aStar.search(), [
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
	},]);
});