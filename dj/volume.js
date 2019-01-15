var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!volume",
  desc:"Set volume to specified value (default 0.25)",
  music:true,
  func:function(message){
  	if(!message.guild.voiceConnection) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel..")})
  	if(message.member.voiceChannel =! message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Youre not in the same voice channel as me")})
    try {music.events.emit("skip", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }
  }
}