var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!volume",
  desc:`Set volume to specified value (default ${global.defaultVolume})`,
  music:true,
  func:function(message){
  	if(!message.guild.voice.connection) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel..")})
  	if(message.member.voice.connection =! message.guild.me.voice.connection) return message.channel.send({embed:utils.embed("sad", "You\'re not in the same voice channel as me")})
    if (isNaN(message.content.split(" ")[1])) return  message.channel.send({embed:utils.embed("sad","You've gotta provide a number input for that.")})
    try {music.events.emit("setVolume", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }
  }
}