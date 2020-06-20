const Discord = require("discord.js")
var utils = require("../utils/index.js")
module.exports = {
  name:"!ping",
  desc:"Pings the bot",
  func:function(message){
  var content = utils.embed("happy", `Pong! That took \`${global.client.ws.ping} ms!\``)
    message.channel.send({embed: content})
  }
}
