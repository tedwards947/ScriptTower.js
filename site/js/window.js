var WindowModule = (function(){
	var my = {};
	
	my.init = function() {
		$(document).on("ready", function () {
		
			$("#toolbox").draggable({
				containment: "#main-wrapper",
				handle:"#toolbox-handle"
			
			});
			$("#info-bar").draggable({
				containment: "#header-wrapper",
				axis:"x"
			});
	
		});
	}
	
	return my;
})();