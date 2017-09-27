const Discord = require("discord.js")
const utils = require("../utils/index.js")
var ytID = require("get-youtube-id")

module.exports = {
  name:"!playing",
  desc:"Checks the current playing song and time left",
  music:true,
  func:function(message, music){
    if(!message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel, add me in with !summon")})
    if(queue.length === 0) return message.channel.send({embed:utils.embed("sad","Theres no songs in the queue, add one with !add")})
    if(!message.guild.voiceConnection.speaking) return message.channel.send({embed:utils.embed("angry", "Im not playing stuff")})
    var seconds = (message.guild.voiceConnection.dispatcher.time / 1000).toFixed(0)
    let played = utils.tomins(seconds)
    let footer = ytID(global.queue[0]["url"])
    if(footer === null) footer = global.queue[0]["url"]
    let second = played[1]
    if(second < 9) second = "0" + played[1].toString()
    message.channel.send({embed:utils.embed("happy", `\`Playing ${global.queue[0]["info"]}\` \`${played[0]}:${second}/${global.queue[0].minutes}:${global.queue[0].seconds}\``, undefined, `https://youtu.be/${footer}`)})
  }
}
