var voicekick= require("./voicekick.js")
var skip= require("./skip.js")
var pollstart = require("./pollstart.js")
var pollend = require("./pollend.js")
var modhelp = require("./modhelp.js")
var leave = require("./leave.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./voicekick.js')]
    delete require.cache[require.resolve('./skip.js')]
    delete require.cache[require.resolve('./pollstart.js')]
    delete require.cache[require.resolve('./pollend.js')]
    delete require.cache[require.resolve('./modhelp.js')]
    delete require.cache[require.resolve("./leave.js")]
    modhelp = require("./modhelp.js")
    pollend = require("./pollend.js")
    pollstart= require('./pollstart.js')
    skip= require('./skip.js')
    voicekick = require("./voicekick.js")
    leave = require("./leave.js")

}
module.exports.voicekick = voicekick
module.exports.skip = skip
module.exports.pollstart = pollstart
module.exports.pollend = pollend
module.exports.modhelp = modhelp
module.exports.leave = leave
