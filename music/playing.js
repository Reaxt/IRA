const Discord = require("discord.js")
const utils = require("../utils/index.js")
var ytID = require("get-youtube-id")

module.exports = {
  name:"!playing",
  desc:"Checks the current playing song and time left",
  music:true,
  func:function(message, music){
    if(!message.guild.me.voice?.channel) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel, add me in with !summon")})
    if(queue.length === 0) return message.channel.send({embed:utils.embed("sad","Theres no songs in the queue, add one with !add")})
    if(!message.guild.voice?.connection?.dispatcher) return message.channel.send({embed:utils.embed("angry", "I\'m not playing anything!")})
    var element = global.queue[0];
    if (element.type == "youtube") {
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let footer = ytID(element["url"])
      if(footer === null) footer = element["url"]
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("track_played", `Playing \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` queued by \`${element["user"].username}\``, undefined, `https://youtu.be/${footer}`)})
    } 
    else if (element.type == "soundcloud") {
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("track_played", `Playing \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` queued by \`${element["user"].username}\``, undefined, element.permalink_url)})
    } 
    else { // direct currently does not support track length
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let second = played[1]
      message.channel.send({embed:utils.embed("track_played", `Playing [${element["info"]}](${element["url"]}) \`${played[0]}:${second}\` queued by \`${element["user"].username}\``, undefined, undefined)})
    }
  }
}
