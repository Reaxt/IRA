fs = require("fs");
fs.readdirSync("./general/").forEach(file => { // Get files in this directory and add a corresponding require if .js
	if (file.endsWith(".js")) {
		commandName = file.split(".js")[0];
		var thisCommand = require("./"+file);
		module.exports[commandName] = thisCommand;
	}
});
module.exports.refresh = () => { 
	fs.readdirSync("./general/").forEach(file => {
		if (file.endsWith(".js")) {
			delete require.cache[require.resolve("./"+file)];
			commandName = file.split(".js")[0];
			var thisCommand = require("./"+file);
			module.exports[commandName] = thisCommand;
		}
	});
}

/**
var yes= require("./yes.js")
var ping = require("./ping.js")
var help = require("./help.js")
var videolink = require("./videolink.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./ping.js')];
    delete require.cache[require.resolve('./yes.js')];
    delete require.cache[require.resolve('./help.js')]
    delete require.cache[require.resolve('./videolink.js')]
    ping = require('./ping.js');
    yes = require('./yes.js')
    help = require('./help.js')
    videolink = require("./videolink.js")
}
module.exports.yes = yes
module.exports.ping = ping
module.exports.help = help
module.exports.videolink = videolink**/