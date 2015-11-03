QUnit.test("row dup", function(assert) {
	/**
	 * @type Array.<Array.<number>>
	 */
	var solution = [ [ 4, 8, 9, 6, 4, 7, 3, 2, 5 ],
			[ 2, 7, 6, 5, 9, 3, 1, 8, 4 ], [ 5, 3, 1, 4, 8, 2, 7, 6, 9 ],
			[ 7, 5, 2, 0, 3, 0, 4, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 0, 7, 0 ],
			[ 0, 0, 4, 0, 2, 0, 6, 0, 1 ], [ 3, 0, 5, 8, 0, 1, 9, 0, 0 ],
			[ 0, 6, 0, 0, 5, 0, 0, 1, 0 ], [ 1, 0, 0, 2, 0, 0, 8, 0, 3 ] ];

	var board = new SudokuBoard(solution);

	var ai = new BasicSudoku(board);

	assert.ok(!ai.isValid(solution));
});

QUnit.test("column dup", function(assert) {
	var solution = [ [ 4, 8, 9, 6, 0, 7, 3, 2, 5 ],
			[ 2, 7, 6, 5, 9, 3, 1, 8, 4 ], [ 5, 3, 1, 4, 8, 2, 7, 6, 9 ],
			[ 7, 5, 2, 0, 3, 0, 4, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 0, 7, 0 ],
			[ 0, 0, 4, 0, 2, 0, 6, 0, 1 ], [ 3, 0, 5, 8, 0, 1, 9, 0, 0 ],
			[ 4, 6, 0, 0, 5, 0, 0, 1, 0 ], [ 1, 0, 0, 2, 0, 0, 8, 0, 3 ] ];

	var board = new SudokuBoard(solution);

	var ai = new BasicSudoku(board);

	assert.ok(!ai.isValid(solution));
});

QUnit.test("box dup", function(assert) {
	var solution = [ [ 4, 8, 9, 6, 4, 7, 3, 2, 5 ],
			[ 2, 4, 6, 5, 9, 3, 1, 8, 4 ], [ 5, 3, 1, 4, 8, 2, 7, 6, 9 ],
			[ 7, 5, 2, 0, 3, 0, 4, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 0, 7, 0 ],
			[ 0, 0, 4, 0, 2, 0, 6, 0, 1 ], [ 3, 0, 5, 8, 0, 1, 9, 0, 0 ],
			[ 0, 6, 0, 0, 5, 0, 0, 1, 0 ], [ 1, 0, 0, 2, 0, 0, 8, 0, 3 ] ];

	var board = new SudokuBoard(solution);

	var ai = new BasicSudoku(board);

	assert.ok(!ai.isValid(solution));
});

QUnit.test("71:Easy", function(assert) {

	var grid = [ [ 4, 0, 9, 0, 0, 7, 0, 0, 5 ], [ 0, 7, 0, 0, 9, 0, 0, 8, 0 ],
			[ 0, 0, 1, 4, 0, 2, 7, 0, 9 ], [ 7, 0, 2, 0, 3, 0, 4, 0, 0 ],
			[ 0, 1, 0, 0, 0, 0, 0, 7, 0 ], [ 0, 0, 4, 0, 2, 0, 6, 0, 1 ],
			[ 3, 0, 5, 8, 0, 1, 9, 0, 0 ], [ 0, 6, 0, 0, 5, 0, 0, 1, 0 ],
			[ 1, 0, 0, 2, 0, 0, 8, 0, 3 ] ];

	var solution = [ [ 4, 8, 9, 6, 1, 7, 3, 2, 5 ],
			[ 2, 7, 6, 5, 9, 3, 1, 8, 4 ], [ 5, 3, 1, 4, 8, 2, 7, 6, 9 ],
			[ 7, 5, 2, 1, 3, 6, 4, 9, 8 ], [ 6, 1, 3, 9, 4, 8, 5, 7, 2 ],
			[ 8, 9, 4, 7, 2, 5, 6, 3, 1 ], [ 3, 2, 5, 8, 7, 1, 9, 4, 6 ],
			[ 9, 6, 8, 3, 5, 4, 2, 1, 7 ], [ 1, 4, 7, 2, 6, 9, 8, 5, 3 ], ];

	var board = new SudokuBoard(grid);

	var ai = new BasicSudoku(board);

	assert.ok(ai.isValid(grid), "initial board is valid");

	var aStar = new AStar(ai);
	assert.deepEqual(aStar.getSolution()._state.map, solution,
			"found the expected solution");
});