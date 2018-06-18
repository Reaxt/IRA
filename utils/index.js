var embed= require("./embed.js")
var numreact= require("./numreact.js")
var tomins= require("./tomins.js")
var elementToString= require("./elementToString.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./embed.js')];
    delete require.cache[require.resolve('./numreact.js')]
    delete require.cache[require.resolve("./tomins.js")]
    delete require.cache[require.resolve("./elementToString.js")]
    embed = require('./embed.js');
    numreact = require('./numreact.js')
    tomins = require('./tomins.js')
    elementToString = require("./elementToString.js")
}
module.exports.embed = embed
module.exports.numreact = numreact
module.exports.tomins = tomins
module.exports.elementToString = elementToString