var yes= require("./yes.js")
var ping = require("./ping.js")
var help = require("./help.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./ping.js')];
    delete require.cache[require.resolve('./yes.js')];
    delete require.cache[require.resolve('./help.js')]
    ping = require('./ping.js');
    yes = require('./yes.js')
    help = require('./help.js')
}
module.exports.yes = yes
module.exports.ping = ping
module.exports.help = help
