var requestHandlers = require("./requestHandlers");

function route(handle, pathname, response, postData) {
	console.log("About to route a request for " + pathname + " with data: " + postData);
	

	
	function IsFileJS(path){
		if(path.indexOf(".js") > -1){
			return true;
		}
		return false;
	}
	function IsFileCSS(path){
		if(path.indexOf(".css") > -1){
			return true;
		}
		return false;
	}
	function IsFileImage(path){
		var imageExtensions = [
			'.bmp','.gif','.ico','.cur','.jpeg','.jpg','.png','.tiff'
		]
		
		var cntExtension = 0, extensionsLength = imageExtensions.length;
		
		for( ; cntExtension < extensionsLength; cntExtension++){
			if(path.indexOf(imageExtensions[cntExtension])> -1){
				return true;
			}
		
		}
		return false;
	
	}
	if(IsFileJS(pathname) ){
		// console.log("FILE RECOGNIZED AS JS");
		requestHandlers.servefile("js", pathname, response, postData);
	}
	else if(IsFileCSS(pathname) ){
		//console.log("FILE RECOGNIZED AS CSS");
		requestHandlers.servefile("css", pathname, response, postData);
	}
	else if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} 
	else if(IsFileImage(pathname)){
		//console.log("FILE RECOGNIZED AS IMAGE!");
		requestHandlers.servefile("image", pathname, response, postData);
	}
	else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;