fs = require("fs");
var commandList = []
fs.readdirSync("./dj/").forEach(file => { // Get files in this directory and add a corresponding require if .js
    if (file.endsWith(".js") && file != "index.js") {
        var commandName = file.split(".js")[0];
        var thisCommand = require("./"+file);
        module.exports[commandName] = thisCommand;
        commandList.push(commandName);
    }
});

module.exports.commandList = commandList;
module.exports.refresh = () => { 
    var commandList = []
    fs.readdirSync("./dj/").forEach(file => {
        if (file.endsWith(".js") && file != "index.js") {
            delete require.cache[require.resolve("./"+file)];
            var commandName = file.split(".js")[0];
            var thisCommand = require("./"+file);
            module.exports[commandName] = thisCommand;
            commandList.push(commandName);
        }
    });
    module.exports.commandList = commandList;
}
module.exports.perms = ["mod", "owner", "dj"];