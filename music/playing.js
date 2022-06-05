const Discord = require("discord.js")
const utils = require("../utils/index.js")
var ytID = require("get-youtube-id")

module.exports = {
  name:"!playing",
  desc:"Checks the current playing song and time left",
  music:true,
  func:function(message, music){
    if(!message.guild.me.voice?.channel) return message.channel.send({embed:utils.embed("sad","I'M NOT THERE LET ME IN WITH COMMAND[`!summon`]")})
    if(queue.length === 0) return message.channel.send({embed:utils.embed("sad","THERE'S NOTHING LEFT TO PLAY ADD SOMETHING WITH COMMAND[`!add`]")})
    if(!message.guild.voice?.connection?.dispatcher) return message.channel.send({embed:utils.embed("angry", "AT LEAST LET ME PLAY SOMETHING FIRST")})
    var element = global.queue[0];
    if (element.type == "youtube") {
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let footer = ytID(element["url"])
      if(footer === null) footer = element["url"]
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("track_played", `PLAYING \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` QUEUED BY \`${element["user"].username}\``, undefined, `https://youtu.be/${footer}`)})
    } 
    else if (element.type == "soundcloud") {
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let second = played[1]
      if(second < 10) second = "0" + played[1].toString()
      message.channel.send({embed:utils.embed("track_played", `PLAYING \`${element["info"]}\` \`${played[0]}:${second}/${element.minutes}:${element.seconds}\` QUEUED BY \`${element["user"].username}\``, undefined, element.permalink_url)})
    } 
    else { // direct currently does not support track length
      var seconds = (message.guild.voice.connection.dispatcher.streamTime / 1000).toFixed(0)
      let played = utils.tomins(seconds)
      let second = played[1]
      message.channel.send({embed:utils.embed("track_played", `PLAYING [${element["info"]}](${element["url"]}) \`${played[0]}:${second}\` QUEUED BY \`${element["user"].username}\``, undefined, undefined)})
    }
  }
}
