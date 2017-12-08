var utils = require("../utils/index.js")
const Discord = require("discord.js")
module.exports = {
  name:"!summon",
  desc:"Makes IRA join the voice channel (Deprecated)",
  music:true,
  func:function(message){
    var voiceChannel = message.member.voiceChannel
    if(!voiceChannel) return message.channel.send({embed:utils.embed("sad", "Please join a voice channel first")})
    if(message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "I am already in a voice channel")})
    voiceChannel.join()
  }
}
