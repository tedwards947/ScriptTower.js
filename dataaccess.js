//CURRENTLY DISABLED!

var MongoClient = require("mongodb").MongoClient;

var theDB;

function connect(){

	MongoClient.connect("mongodb://localhost:27017/buzzword", function(err, db){
	
		if(!err){
			console.log("We are connected");		
		}
	
	
		theDB = db;

	});
}

function storevalue(value){

	if(!theDB){
		return false;
	}
	
	var collection = theDB.collection("buzz");
	console.log("collection!");
	collection.insert(value, {w:1}, function(err, result){
		if(err){
			console.log("Error detected:");
			console.log(err);
		
		}
		
		
	});
	return true;
	
	
}
function queryall(callback){

	if(!theDB){
		return false;
	}
	
	var collection = theDB.collection("buzz");
	collection.find().toArray(function(err, items) {
	
		if(typeof callback === "function"){callback(items);}
	});
	
	
}



exports.connect = connect;
exports.storevalue = storevalue;
exports.queryall = queryall;