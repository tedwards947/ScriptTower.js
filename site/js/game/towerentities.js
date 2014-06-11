/*

The unit of width here is the size and shape of the "floor"
tool. Income and expenses are either daily (D), quarterly, (Q), yearly
(Y), or once only (!).



Type         Width   Price     Income/Expense       Population   
====         =====   =====     =============        ==========   
Floor           1     500           0                 0       
Lobby           1      5k       0/0/-3/?/?   (Q)      0         
Stair           8      5k                             0 
Escalator       8     20k           5k       (Q)      0         

Office          9     40k        2-5-10-15k  (Q)      6       
Condo          16     80k     50-100-150-200k(!)      3
Single          4     20k     500-1500-2k-3k (D)      0-1
Double          6     50k     800-2k-3k-4500 (D)      0-2
Suite          10    100k     1500-4k-6k-9k  (D)      0-2

Fast Food      16    100k        (-3k)-2k-5k (D)      10-50
Restaurant     24    200k          4k-6k-10k (D)      10-100
Retail Shop    12    100k     4k-10k-15k-20k (D)      20-50
Party Hall    24x2   100k         20k        (D)      50
Theatre       31x2   500k         0-2k-10k   (D)     120
Cathedral           3 Million      0                   0  
 
Housekeeping   15    50k               -10k  (Q)      not included
Security       16   100k               -20k  (Q)      not included
Medical        26   500k                0             not included
Parking         4     3k                0              0
Ramp           16    50k               -10k  (Q)       0
Recycling    25x2   500k      0        -50k  (Q)
Metro         ALL  1 Million          -100k  (Q)       0

Elevators:                                               Capacity
  Standard   4    200k+80k/car      -10k/car (Q)        17 (21 in update)
  Service    4    100k+50k/car      -10k/car (Q)        17 (21 in update)
  Express    6    400k+150k/car     -20k/car (Q)        34 (42 in update)

*/



var TowerObjectsModule = ( function(){
	var my = {};

	//using Base.js (pretty sure?)
	var TowerEntity = Base.extend({
		//idk can we identify common props and methods across every object?
	
		
		//useful for lobby, metro station, floor?
		canBeDestroyed: true,
		
		//useful for lobby, elevator, floor
		canDragToBuild: false,
		
		price: 0,
		
		income: 0,
		
		expense: 0,
		
		
		/*
		accountingInterval is how frequently expenses/income are calculated
			"quarterly"
			"daily"
			"yearly"
			"once"
		*/
		accountingInterval: "once",
		
		
		
		//perhaps store the image/sprite/whatever here?
		
		//height and width abandoned in favor of position, i think.
		//height: 0,
		//width: 0
		//for child objects with a 'fixed' width, position can be set by pointer location + height/width upon object creation
	
		position: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0		
		},
		
		floorWidth: 0
	});
	
	
	
	
	var Floor = TowerEntity.extend({
	
	
	/*
		 Floor sections cost $500 for that little narrow piece the size of
		the floor tool.  Once built, floor sections cannot be destroyed.
	
	*/
		canBeDestroyed: false,
		canDragToBuild: true,
	
	
		//level is 0-indexed, where 0 is the first floor lobby
		level: 0, 
		getUserReadableLevel: function() {
			//maps level to B1, etc... from the -1 index
			
			if ( this.level < 0 ) {
				//if it's negative, abs() it and prefix with "B"
				
				//i thiiiiink this is how you self-reference?
				return "B" + Math.abs(this.level);
			}
			else {
				//add one to the level
				return this.level + 1;
			}
		},
		
		//is the floor underground?
		isUnderground: false,
		
		//array of units (offices, apartments, condos, etc etc etc)
		units: [],
		
		//if the floor is eligible to be a lobby
		canBeLobby: false,
		canBeSkyLobby: false,
		
		//good place to put a cinema, etc. not sure about this yet?
		goodForAmenities: false,
		
		
		// !!!!-------------
		//if level exists where the user wants to place a unit, we extend the length of the floor, provided that it meets the requirements
		constructor: function () {
			//level and eligibility checks are performed upon floor creation--if ineligible, returns false or does some callback operation
			
		}

	});
	var Lobby = TowerEntity.extend({
		/*
			Lobbies cost $5000 for a section the size of the floor tool. Add
			another $500 for the floor itself. The lobby tool actually places 4
			sections of lobby. Lobby sections can be built by dragging, but cannot
			be destroyed.
		
		*/
		canBeDestroyed: false,
		canDragToBuild: true
		//if we ever decide to implement multi-stored lobbies, we'll try this
	});
	
	var Unit = TowerEntity.extend({
		//level obj to which it belongs
		myLevel: {},
		
		//capacity
		capacity: 0,
		
		population: 0,
		
		//Humans inside []
		humans: [],
				
				
				
		/*
		rentLevels should be an array of rent prices, lowest to highest. 
		The user selected value is put into currentRent
		We can then use the index of the array to calculate eval?
		*/
		rentLevels = [],
		currentRent = 0,
		
		income = 0, //some number to be set based on which rentLevels[x] is selected
		
		
		
		//eval [0-4? where 4 = good]
		eval: 4,
		
		/*
		By this isVacant I mean: for sale, not too dirty, un-rented, etc.
		also is used for housekeeping/security?
		*/
		isVacant = true,
		
		//too dirty, infested, eval too low, etc
		isUndesireable = false,
		
		
		//revenue (per timeperiod [week?]?)
		//revenue (per customer?)
		
		//today's revenue
		//yesterday's profit
		
		
		//name is user-settable
		name: "",
		
		//array of messages to be shown in a box
		messages: [
		
		]
		
		
		//other properties/methods....
	
	});
	
	
	/*
	UNIT TYPES
	==========

	
	Office
	Condo
	FastFood

	Housekeeping
	Security
	
	Single Room
	Double Room
	Suite
	Retail
	Restaurant
	Clinic
	Parking
	Ramp
	Recycling Center
	Theatre
	
	Metro
	
	Cathedral
	
	+ more?? :D:D

	*/
	
	var Office = Unit.extend({
		capacity: 6,
		rentLevels: [
			2000,
			5000,
			10000,
			15000
		],
		currentRent: 2,
		accountingInterval: "quarterly",
		price: 40000,
		floorWidth: 9
		
		//add a message and have the name autogen?
	});
	var Condo = Unit.extend({
		capacity: 3,
		rentLevels: [
			50000
			100000
			150000
			200000
		],
		currentRent: 2,
		accountingInterval: "once",
		price: 80000,
		floorWidth: 16
		
		//add a message and have the name autogen?
	});
	
	
	var HotelRoom = Unit.extend({
		//some sort of methods to control infestation/housekeeping/etc
	});
	var SingleHotel = HotelRoom.extend({
		capacity: 1,
		rentLevels: [
			500,
			1500,
			2000,
			3000
		],
		currentRent: 2,
		accountingInterval: "daily",
		price: 20000,
		floorWidth: 4
		
		//add a message and have the name autogen?
	});
	var DoubleHotel = HotelRoom.extend({
		capacity: 2,
		rentLevels: [
			800,
			2000,
			3000,
			4500
		],
		currentRent: 2,
		accountingInterval: "daily",
		price: 50000,
		floorWidth: 6
		
		//add a message and have the name autogen?
	});
	var SuiteHotel = HotelRoom.extend({
		capacity: 2,
		rentLevels: [
			1500,
			4000,
			6000,
			9000
		],
		currentRent: 2,
		accountingInterval: "daily",
		price: 100000,
		floorWidth: 10
		
		//add a message and have the name autogen?
	});
	
	
	
	
	
	
	
	
	
	
	
	return my;
})();