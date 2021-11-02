var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!skip",
  desc:"Skips the current song",
  music:true,
  func:function(message){
  	if(!message.guild.voice.channel) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel..")})
  	if(message.member.voice.channel =! message.guild.me.voice.channel) return message.channel.send({embed:utils.embed("sad", "You\'re not in the same voice channel as me")})
  	if(!message.guild.voice.connection.dispatcher) return message.channel.send({embed:utils.embed("sad", "I\'m not playing anything right now")})
    try {music.events.emit("skip", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }
  }
}
//en dme
