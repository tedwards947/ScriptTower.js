ScriptTower.js
==============

A HTML5/JS clone(?) of SimTower

HTML5/JavaScript [pixi.js engine]

I am a terrible artist so I'm going to have to figure out what I'm going to do in that respect.

================
Style/Convention
================
Trying my best to adhere to idiomatic.js, you should too.

Naming conventions:

variables
	const CONSTANT = 0;
	var _moduleGlobalScopeVariable; (aside from "my")
	var localScopeVariable;
	var GlobalScopeVariable; (Exclusively used for Module names. Don't use globally-scoped vars if possible)
	
functions
	function myFunc(){}

objects
	function MyObject(){} (Object Prototype)
	var myObjectInstance = new MyObject(); 

================
Other
================
Server:
	I'm not sure what the final server architecture will be at all but right now it's running Node.js.
	I haven't had the need to serve up anything yet though.
	(Don't try to run it with node yet, i've not updated the config to match the new dir structure)