var utils = require("../utils/index.js")
const Discord = require("discord.js")
module.exports = {
  name:"!summon",
  desc:"Makes me join the voice channel (Deprecated)",
  music:true,
  hidden:true,
  func:function(message){
    var voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send({embed:utils.embed("sad", "Please join a voice channel first")})
    if(message.guild.me.voice.channel) return message.channel.send({embed:utils.embed("sad", "I am already in a voice channel")})
    return voiceChannel.join()
  }
}