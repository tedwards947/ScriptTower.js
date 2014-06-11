
EngineModule.init(reportFPS);
WindowModule.init();
ClockModule.init();


var $fpsMon = $("#fps");
function reportFPS(fpsMonOptions){
//most of this credit to:
//http://stackoverflow.com/questions/4787431/check-fps-in-js

if(!fpsMonOptions.doMonFPS){return true;}

	setInterval(function(){
		var fpsText = (1000/fpsMonOptions.frameTime).toFixed(1) + " fps";
		$fpsMon.text(fpsText);
	},1000);

}



//SANDBOX AREA
$(document).on("ready", function(){
	$(window).on("scroll", function(e){
	
		var y = $(window).scrollTop();
		var x = $(window).scrollLeft();

		EngineModule.performBoop(x, y);

	});


});




