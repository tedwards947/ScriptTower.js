var EngineModule = (function() {
    var my = {};

    const WIDTH = 1000;
    const HEIGHT = 500;
    const INTERACTIVE = true;

    var _stage = {};
    var _renderer = {};
    var _graphics = {};
	
	var _test = {};

	var _lastScrollX = 0, _lastScrollY = 0; 



    my.init = function(fpsCallback) {
        $(document).on("ready", function() {

            _stage = new PIXI.Stage(0xEEFFFF, INTERACTIVE);
            _renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, null, true);


            document.getElementById("main-game").appendChild(_renderer.view);

            _graphics = new PIXI.Graphics();



			 _test =  new PIXI.DisplayObjectContainer();
			_test.addChild(_graphics);
			_stage.addChild(_test);
			
           // _stage.addChild(_graphics);

            if (typeof fpsCallback === "function") {
                fpsCallback(fpsMonOptions);
            }


            SampleStuff();

            requestAnimFrame(gameLoop);
            
            
            //sets initial scrolling info
            _lastScrollX = $(window).scrollTop();
            _lastScrollY = $(window).scrollLeft();
        });

    }

    var fpsMonOptions = {
        doMonFPS: true,
        filterStrength: 10,
        frameTime: 0,
        lastLoop: new Date,
        thisLoop: 0
    }
	function gameLoop() {
		requestAnimFrame(gameLoop);

		if (fpsMonOptions.doMonFPS) {
			var thisFrameTime = (fpsMonOptions.thisLoop = new Date) - fpsMonOptions.lastLoop;
			fpsMonOptions.frameTime += (thisFrameTime - fpsMonOptions.frameTime) / fpsMonOptions.filterStrength;
			fpsMonOptions.lastLoop = fpsMonOptions.thisLoop;
		}

		var thisLoop = new Date;


		_renderer.render(_stage);
	}




	function SampleStuff() {



		function regTile(backgroundColor, borderColor, w, h) {
			return function(x, y) {

				_graphics.beginFill(backgroundColor);
				_graphics.lineStyle(1, borderColor, 1);
				_graphics.moveTo(x, y);
				_graphics.lineTo(x + w, y);
				_graphics.lineTo(x + w, y + h);
				_graphics.lineTo(x, y + h);
				_graphics.lineTo(x, y);
				_graphics.endFill();

			}


		}



		// map
		var G = 0,
			D = 1,
			W = 2,
			X = 3;
		var terrain = [
			[G, G, G, G, G, G, G, G, G, G, W, W],
			[D, D, X, D, G, G, G, G, G, G, W, W],
			[D, G, X, W, G, G, G, G, G, G, W, W],
			[D, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, G, G, G, G, G, G, G, G, W, W],
			[D, D, X, D, G, G, G, G, G, G, W, W],
			[D, G, X, W, G, G, G, G, G, G, W, W],
			[D, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, G, G, G, G, G, G, G, G, W, W],
			[D, D, X, D, G, G, G, G, G, G, W, W],
			[D, G, X, W, G, G, G, G, G, G, W, W],
			[D, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
			[G, G, W, W, G, G, G, G, G, G, W, W],
		];

		var tileHeight = 60;
		var tileWidth = 60;

		// tiles
		var grass = regTile(0x80CF5A, 0x339900, tileWidth, tileHeight);
		var dirt = regTile(0x96712F, 0x403014, tileWidth, tileHeight);
		var water = regTile(0x85b9bb, 0x476263, tileWidth, tileHeight);
		var empty = function() {};
		var tileMethods = [grass, dirt, water, empty];

		function drawRegMap(terrain, xOffset) {
			var tileType, x, y, isoX, isoY, idx;

			for (var i = 0, iL = terrain.length; i < iL; i++) {
				for (var j = 0, jL = terrain[i].length; j < jL; j++) {
					// cartesian 2D coordinate
					x = j * tileWidth;
					y = i * tileHeight;

					tileType = terrain[i][j];
					drawTile = tileMethods[tileType];
					drawTile(xOffset + x, y);
				}
			}
		}

		drawRegMap(terrain, WIDTH / 2);




	}


	
	my.performBoop = function(scrollX, scrollY){
		
		var deltaX = _lastScrollX - scrollX;
		var deltaY = _lastScrollY - scrollY;
		
		
		var lastContainerX = _test.position.x;
		var lastContainerY = _test.position.y;
		
		_test.position.x = lastContainerX + deltaX;
		_test.position.y = lastContainerY + deltaY;
	
	
		//updates the _lastScroll(s)
		_lastScrollX = scrollX;
		_lastScrollY = scrollY;
	};
	
    return my;
})();