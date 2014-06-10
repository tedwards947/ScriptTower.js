var querystring = require("querystring"),
fs = require("fs");
//dataaccess = require("./dataaccess");

const BASE_DIRECTORY = "./nodeJS/simpleNodeWebApp/";
const SITE_DIRECTORY = "site/";
var _siteDirectoryPrefix = (function() {
	return BASE_DIRECTORY + SITE_DIRECTORY;
})();



 function start(response) {
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.createReadStream(_siteDirectoryPrefix + "index.html").pipe(response);
	
 }
 
 function otherPage(response){
	console.log("Request handler 'otherpage' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.createReadStream(_siteDirectoryPrefix + "other.html").pipe(response);
 }



 
 function respond(response, postData){
 // console.log("function unused, change to fit your scenario!");
 // return true;
	// console.log("handler response called!");
	
	// console.log("PostData:");
	// var parsedData = JSON.parse(postData);

	
	// var dataResult = dataaccess.storevalue(parsedData);
	
	// if(!dataResult){
		// console.log("database prollem :(");
		// return false;
	// }
	
	
	// dataaccess.queryall(function(items){
		// console.log(items);
		
		// response.writeHead(200, {"Content-Type": "application/json"});

		// if(items.length > 0){
			// response.end(JSON.stringify(items));
		// }
		// else{
			// response.end(0);
		// }
		
	
	
	// });
	
	
 
 }
 
function servefile(type, path, response, postData){
	console.log("Request to serve file of type: " + type + " with path: " + path + " was called.");
		
	var streamString = _siteDirectoryPrefix + path;
	var contentType = {"Content-Type": "text/plain"};
	
	if(type == "js"){
		contentType = {"Content-Type": "application/javascript"};
	}
	else if(type == "css"){
		contentType = {"Content-Type": "text/css"};
	}
	else if(type == "image"){
		contentType = {"Content-Type": "image/jpg"};
	}
	else{
		//do nothing, maybe do something later?
	}
	
	
	fs.exists(streamString, function(exists) {
	  if (exists) {
		response.writeHead(200, contentType);
		fs.createReadStream(streamString).pipe(response);
	  } 
	  else {
		console.log("No file found for " + path);
		response.writeHead(404, contentType);
		response.write("404 Not found");
		response.end();
	  }
	});
	
} 
 
 exports.start = start;
 exports.otherPage = otherPage;
 
 exports.servefile = servefile;
 
 exports.respond = respond;


 