var Loggy = function(){
	this._ALL = 0; this._DEBUG = 1; this._INFO = 2; this._ERROR = 3;
	this.level = this._DEBUG;
	this.levels = ["ALL","DEBUG","INFO","ERROR"];
	this.log = function(messages, level){
		if(arguments.length <= 1)return console.error("Invalid parameters, expecting: log(message, LEVEL)");
		arguments = Array.prototype.slice.call(arguments);
		var level = arguments.pop();
		if(typeof level == 'string')level = this["_" + level.toUpperCase()] || console.error("INVALID LOG LEVEL.");
		if(level < this.level)return;
		var timestamp = new Date();
		for (var i = 0; i < arguments.length; i++) {
			var timestampText = i == 0 ? timestamp.format("HH:MM:ss") : "        ";
			console[level == this._ERROR ? 'error' : 'log'](timestampText + " | " + this.levels[level] + " |", arguments[i]);
		}
	}
	this.all = function(message){
		var args = Array.prototype.slice.call(arguments);args.push(this._ALL);
		this.log.apply(this, args);
	}
	this.debug = function(message){
		var args = Array.prototype.slice.call(arguments);args.push(this._DEBUG);
		this.log.apply(this, args);
	}
	this.info = function(message){
		var args = Array.prototype.slice.call(arguments);args.push(this._INFO);
		this.log.apply(this, args);
	}
	this.error = function(message){
		var args = Array.prototype.slice.call(arguments);args.push(this._ERROR);
		this.log.apply(this, args);
	}
}
