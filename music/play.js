var utils = require("../utils/index.js")
const Discord = require("discord.js")
var events = require("./index.js")

module.exports = {
  name:"!play",
  desc:"Plays the queue (Deprecated)",
  music:true,
  hidden:true,
  func:function(message){
    if(global.queue.length === 0) return message.channel.send({embed:utils.embed("sad","THERE'S NOTHING LEFT TO PLAY ADD SOMETHING WITH `command[!add]`")})
    if(!message.guild.voice.connection) return message.channel.send({embed:utils.embed("sad","I'M NOT THERE LET ME IN WITH `command[!summon]`")})

    if(message.guild.voice.connection.dispatcher || global.playing) return //message.channel.send({embed:utils.embed("angry", "Im already playing stuff")})
    try {events.events.emit("play", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``,"RED")})
    }

  }
}
