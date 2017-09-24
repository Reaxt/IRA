var summon= require("./summon.js")
var add= require("./add.js")
var queue = require("./queue.js")
var play = require("./play.js")
var voteskip = require("./voteskip.js")
var events = require("../events/music.js")
var playing = require("./playing.js")
module.exports.refresh = (message) => {

    delete require.cache[require.resolve('./summon.js')]
    delete require.cache[require.resolve('./add.js')]
    delete require.cache[require.resolve('./queue.js')]
    delete require.cache[require.resolve('./play.js')]
    delete require.cache[require.resolve('../events/music.js')]
    delete require.cache[require.resolve('./voteskip.js')]
    delete require.cache[require.resolve('./playing.js')]
    events = require("../events/music.js")
    play = require("./play.js")
    queue = require("./queue.js")
    add = require("./add.js")
    summon = require("./summon.js")
    voteskip = require("./voteskip.js")
    playing = require("./playing.js")
    events.refresh(message)
}
module.exports.summon = summon
module.exports.add = add
module.exports.queue = queue
module.exports.play = play
module.exports.events = events.events
module.exports.voteskip = voteskip
module.exports.playing = playing
