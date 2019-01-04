fs = require("fs");
fs.readdirSync("./mod/").forEach(file => { // Get files in this directory and add a corresponding require if .js
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
module.exports.perms = ["mod"];
/**
var skip= require("./skip.js")
var pollstart = require("./pollstart.js")
var pollend = require("./pollend.js")
var modhelp = require("./modhelp.js")
var blacklist = require("./blacklist.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./voicekick.js')]
    delete require.cache[require.resolve('./skip.js')]
    delete require.cache[require.resolve('./pollstart.js')]
    delete require.cache[require.resolve('./pollend.js')]
    delete require.cache[require.resolve('./modhelp.js')]
    delete require.cache[require.resolve("./blacklist.js")]
    modhelp = require("./modhelp.js")
    pollend = require("./pollend.js")
    pollstart= require('./pollstart.js')
    skip= require('./skip.js')
    voicekick = require("./voicekick.js")
    blacklist = require("./blacklist.js")

}
module.exports.voicekick = voicekick
module.exports.skip = skip
module.exports.pollstart = pollstart
module.exports.pollend = pollend
module.exports.modhelp = modhelp
module.exports.blacklist = blacklist
**/