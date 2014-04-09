var Loggy = function(){
	this._DEBUG = 0; this._INFO = 1; this._ERROR = 2;
	this.level = this._DEBUG;
	this.levels = ["DEBUG","INFO","ERROR"];
	this.colors = ['#C74800', 'blue', 'red'];
}
Loggy.prototype.log = function(messages, level){
	arguments = Array.prototype.slice.call(arguments, 0);
	var level = arguments.pop();
	if(typeof level == 'string')level = this["_" + level.toUpperCase()] || console.error("INVALID LOG LEVEL.");
	if(level < this.level)return;
	
	var timestamp = new Date();	
	var timestampText = ('0' + timestamp.getHours()).slice(-2) + ':' + ('0' + timestamp.getMinutes()).slice(-2) + ':' + ('0' + timestamp.getSeconds()).slice(-2);	
	var args = ["%c" + timestampText + " | %c" + this.levels[level] + "%c |", "color: black;", "color: "+this.colors[level]+";", "color: black;"];
	console.log.apply(console, args.concat(arguments));
}
Loggy.prototype.debug = function(message){
	var args = Array.prototype.slice.call(arguments);args.push(this._DEBUG);
	this.log.apply(this, args);
}
Loggy.prototype.info = function(message){
	var args = Array.prototype.slice.call(arguments);args.push(this._INFO);
	this.log.apply(this, args);
}
Loggy.prototype.error = function(message){
	var args = Array.prototype.slice.call(arguments);args.push(this._ERROR);
	this.log.apply(this, args);
}
