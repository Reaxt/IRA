var utils = require("../utils/index.js")
const Discord = require("discord.js")
module.exports = {
  name:"!summon",
  desc:"Makes me join the voice channel (Deprecated)",
  music:true,
  hidden:true,
  func:function(message){
    var voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send({embed:utils.embed("sad", "GET IN A VOICE CHANNEL FIRST")})
    if(message.guild.me.voice.channel) return message.channel.send({embed:utils.embed("sad", "I'M ALREADY IN A VOICE CHANNEL JUST GET IN HERE INSTEAD")})
    return voiceChannel.join()
  }
}