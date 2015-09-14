# javascript-a-star

A general purpose implementation of a* in javascript. 

It is not limited to path finding.

It takes an object that models the world.

That object must implement the following methods:
this.getActions=function(){
return [{'state':}];
};

gScore
hScore
getGoal
setState
getState
keepSearching
