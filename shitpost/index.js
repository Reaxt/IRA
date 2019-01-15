fs = require("fs");
var commandList = []
fs.readdirSync("./shitpost/").forEach(file => { // Get files in this directory and add a corresponding require if .js
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
    fs.readdirSync("./shitpost/").forEach(file => {
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

/**
var paint= require("./paint.js")
var shibe= require("./shibe.js")
var pepsi= require("./pepsi.js")
var pineapple= require("./pineapple.js")
var totinos= require("./totinos.js")
var inkling= require("./inkling.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./paint.js')]
    delete require.cache[require.resolve('./shibe.js')]
    delete require.cache[require.resolve('./pepsi.js')]
    delete require.cache[require.resolve('./pineapple.js')]
    delete require.cache[require.resolve('./totinos.js')]
    delete require.cache[require.resolve('./inkling.js')]
    totinos = require("./totinos.js")
    paint = require('./paint.js')
    shibe = require("./shibe.js")
    pepsi = require("./pepsi.js")
    pineapple = require("./pineapple.js")
    inkling = require("./inkling.js")
}
module.exports.paint = paint
module.exports.shibe = shibe
module.exports.pepsi = pepsi
module.exports.pineapple = pineapple
module.exports.totinos = totinos
module.exports.inkling = inkling
**/