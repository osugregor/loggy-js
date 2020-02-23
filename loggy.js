let Loggy = {
    DEBUG: 0,
    INFO: 1,
    ERROR: 2,
    levels: ["DEBUG", "INFO", "ERROR"],
    colors: ['#C74800', 'blue', 'red'],
    defaults: {
        lineFilter: function(line){return line;},
        showLineSource: true
    },
    init: function (level, options) {
        this.level = level || Loggy.DEBUG;

        if(typeof options == 'undefined') options = {};
        this.lineFilter = options.lineFilter || Loggy.defaults.lineFilter;
        this.showLineSource = 'showLineSource' in options ? options.showLineSource : Loggy.defaults.showLineSource;
    }
};

Loggy.init.prototype.log = function(messages){
    let newArguments = Array.prototype.slice.call(arguments, 0);
    let level = newArguments.pop(),
        e = new Error();
    if(typeof level == 'string')level = Loggy[level.toUpperCase()] || console.error("INVALID LOG LEVEL.");
    if(level < this.level || typeof console === "undefined" || typeof console.log === "undefined")return;

    if(this.showLineSource && e.stack){
        let lines = e.stack.split("\n");
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if(line === "Error" || line.indexOf("at Loggy") !== -1)continue;
            newArguments.push(this.lineFilter(line));
            break;
        }
    }

    if(console.log.apply){
        let timestamp = new Date();
        let timestampText = ('0' + timestamp.getHours()).slice(-2) + ':' + ('0' + timestamp.getMinutes()).slice(-2) + ':' + ('0' + timestamp.getSeconds()).slice(-2);
        let args = ["%c" + timestampText + " | %c" + Loggy.levels[level] + "%c |", "color: black;", "color: "+Loggy.colors[level]+";", "color: black;"];
        args = args.concat(newArguments);
        console.log.apply(console, args);
    }else{
        console.log(messages);
    }


};

Loggy.init.prototype.debug = function(message){
    let args = Array.prototype.slice.call(arguments);
    args.push(Loggy.DEBUG);
    this.log.apply(this, args);
};

Loggy.init.prototype.info = function(message){
    let args = Array.prototype.slice.call(arguments);
    args.push(Loggy.INFO);
    this.log.apply(this, args);
};

Loggy.init.prototype.error = function(message){
    let args = Array.prototype.slice.call(arguments);
    args.push(Loggy.ERROR);
    this.log.apply(this, args);
};

export default Loggy;
