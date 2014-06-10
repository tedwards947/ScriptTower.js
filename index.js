var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
//var dataaccess = require("./dataaccess");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/index"] = requestHandlers.start;
handle["/otherPage"] = requestHandlers.otherPage;
//handle["/respond"] = requestHandlers.respond;



server.start(router.route, handle);
//dataaccess.connect();