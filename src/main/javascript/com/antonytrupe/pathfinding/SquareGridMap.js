function SquareGridMap(map, position) {
	// space is a path, | is a wall
	this.map = map;
	this.position = position;
	
	this.compareTo = function(that) {
		alert('SquareGridMap.compareTo');
	};
}