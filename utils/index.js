fs = require("fs");
fs.readdirSync("./utils/").forEach(file => { // Get files in this directory and add a corresponding require if .js
    if (file.endsWith(".js")) {
        commandName = file.split(".js")[0];
        var thisCommand = require("./"+file);
        module.exports[commandName] = thisCommand;
    }
});
module.exports.refresh = () => { 
    fs.readdirSync("./utils/").forEach(file => {
        if (file.endsWith(".js")) {
            delete require.cache[require.resolve("./"+file)];
            commandName = file.split(".js")[0]
            var thisCommand = require("./"+file);
            module.exports[commandName] = thisCommand;
        }
    });
}
/**
var embed= require("./embed.js")
var numreact= require("./numreact.js")
var tomins= require("./tomins.js")
var elementToString= require("./elementToString.js")
var getaudiotype= require("./getaudiotype.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./embed.js')];
    delete require.cache[require.resolve('./numreact.js')]
    delete require.cache[require.resolve("./tomins.js")]
    delete require.cache[require.resolve("./elementToString.js")]
    delete require.cache[require.resolve("./getaudiotype.js")]
    embed = require('./embed.js');
    numreact = require('./numreact.js')
    tomins = require('./tomins.js')
    elementToString = require("./elementToString.js")
    getaudiotype = require('./getaudiotype.js')
}
module.exports.embed = embed
module.exports.numreact = numreact
module.exports.tomins = tomins
module.exports.elementToString = elementToString
module.exports.getaudiotype = getaudiotype
**/