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
    var element = global.queue[0];
    if (element.type == "youtube") {
      var seconds = (message.guild.voiceConnection.dispatcher.time / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let footer = ytID(element["url"])
      if(footer === null) footer = element["url"]
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("happy", `Playing \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` queued by \`${element["user"].username}\``, undefined, `https://youtu.be/${footer}`)})
    } 
    else if (element.type == "soundcloud") {
      var seconds = (message.guild.voiceConnection.dispatcher.time / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("happy", `Playing \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` queued by \`${element["user"].username}\``, undefined, element.permalink_url)})
    } 
    else { // because direct currently does not support track length
      message.channel.send({embed:utils.embed("happy", `Playing [${element["info"]}](${element["url"]}) queued by \`${element["user"].username}\``, undefined, undefined)})
    }
  }
}
