fs = require("fs");
fs.readdirSync("./botmanage/").forEach(file => { // Get files in this directory and add a corresponding require if .js
    if (file.endsWith(".js")) {
        commandName = file.split(".js")[0];
        var thisCommand = require("./"+file);
        module.exports[commandName] = thisCommand;
    }
});
module.exports.refresh = () => { 
    fs.readdirSync("./mod/").forEach(file => {
        if (file.endsWith(".js")) {
            delete require.cache[require.resolve("./"+file)];
            commandName = file.split(".js")[0]
            var thisCommand = require("./"+file);
            module.exports[commandName] = thisCommand;
        }
    });
}
module.exports.perms = ["mod", "owner"];
/**
var setavatar = require("./setAvatar.js");
var leave = require("./leave.js");
module.exports.refresh = () => {
	delete require.cache[require.resolve('./setavatar.js')]
	delete require.cache[require.resolve("./leave.js")]
	setavatar = require("./setAvatar.js");
	leave = require("./leave.js")
}
module.exports.setavatar = setavatar;
module.exports.leave = leave
**/