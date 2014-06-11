//tower.js

var TowerModule = (function() {
	var my = {};
	
	my.init = function() {
	
	}

	//minimum size of anything
	my.GRID_SIZE.x = 10; 
	my.GRID_SIZE.y = 100; 
	

	return my;
})();


/*
	

The timeframe of the game consists of two working days and one weekend day within a quarter, four quarters in a year

Ideas for time intervals
=======================

TOYING with the idea of using minutes as the base level of time in the game. If so, this is how many minutes in each game-interval.



	5:00AM : Dawn.
	6:30AM : Hotel guests begin to check out, continues until noon.
	7:00AM : Garbage pickup.
	9:00AM : Workday begins (Offices open.)
	10:00AM : Shops and Fast Food open.
	12:00PM - 1:00PM : Lunch hour.
	1:00PM - 4:00PM : Movie runs in the theaters.
	5:00PM : Offices begin to close. 
		   Restaurants open. 
		   Income from Party Halls.
	5:00PM - 8:00PM : Movie runs in the theaters. 
			Hotel Guests check in.
	6:00PM : Dusk.
	8:00PM : Movie Theaters close.
		   Income from Movie Theaters.
	9:00PM : Shops and Fast Food close.
		   Income from Fast Food.
	11:00PM : Restaurants close.
		    Income from Restaurants. 

*/