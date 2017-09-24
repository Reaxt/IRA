const Discord = require("discord.js")
var utils = require("../utils/index.js")
module.exports = {
  name:"!ping",
  desc:"pings the bot",
  func:function(message){
  var content = utils.embed("happy", `Pong! Ping time is \`${this.ping} ms\``)
    message.channel.send({embed: content})
  }
}
