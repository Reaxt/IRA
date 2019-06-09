var events = require("../events/music.js")
module.exports.events = events.events;
fs = require("fs");
var commandList = []
fs.readdirSync("./music/").forEach(file => { // Get files in this directory and add a corresponding require if .js
    if (file.endsWith(".js") && file != "index.js") {
        var commandName = file.split(".js")[0];
        var thisCommand = require("./"+file);
        module.exports[commandName] = thisCommand;
        commandList.push(commandName);
    }
});

module.exports.commandList = commandList;
module.exports.refresh = (message) => { 
    var commandList = []
    fs.readdirSync("./music/").forEach(file => {
        if (file.endsWith(".js") && file != "index.js") {
            delete require.cache[require.resolve("./"+file)];
            var commandName = file.split(".js")[0];
            var thisCommand = require("./"+file);
            module.exports[commandName] = thisCommand;
            commandList.push(commandName);
        }
    });
    module.exports.commandList = commandList;
	delete require.cache[require.resolve('../events/music.js')]
	events = require("../events/music.js")
    events.refresh(message);
}
/**
var summon= require("./summon.js")
var add= require("./add.js")
var queue = require("./queue.js")
var play = require("./play.js")
var voteskip = require("./voteskip.js")
var events = require("../events/music.js")
var playing = require("./playing.js")
var debug = require("./debug.js")
module.exports.refresh = (message) => {

    delete require.cache[require.resolve('./summon.js')]
    delete require.cache[require.resolve('./add.js')]
    delete require.cache[require.resolve('./queue.js')]
    delete require.cache[require.resolve('./play.js')]
    delete require.cache[require.resolve('../events/music.js')]
    delete require.cache[require.resolve('./voteskip.js')]
    delete require.cache[require.resolve('./playing.js')]
    delete require.cache[require.resolve('./debug.js')]
    events = require("../events/music.js")
    play = require("./play.js")
    queue = require("./queue.js")
    add = require("./add.js")
    summon = require("./summon.js")
    voteskip = require("./voteskip.js")
    playing = require("./playing.js")
    playing = require("./debug.js")
    events.refresh(message)
}
module.exports.summon = summon
module.exports.add = add
module.exports.queue = queue
module.exports.play = play
module.exports.events = events.events
module.exports.voteskip = voteskip
module.exports.playing = playing
module.exports.debug = debug
**/