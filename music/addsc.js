const Discord = require("discord.js")
const utils = require("../utils/index.js")
var config = JSON.parse(require("fs").readFileSync("./cfg.json"))
var searchopts = {
  maxResults: 5,
  key: config.ytkey,
  type: 'video'
};
module.exports = {
  name:"!addsc",
  desc:"adds a song from soundcloud",
  music:true,
  func:function(message){
    //if not in voiceChannel

    if(!message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Im not in a voice channel, bring me in one with !summon")})
    if(!message.member.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Youre not in a voice channel")})
    if(message.member.voiceChannel =! message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Youre not in the same voice channel as me")})

    ytdl.getInfo(message.content.split(" ")[1], (err, info) => {
      if(err) {
		  
      } else {
          var result = global.queue.filter(function( obj ) {
            return obj.user.id == message.author.id;
          });
        if(result.length === 3) return message.channel.send({embed:utils.embed("sad", "I’m afraid you threw too much… stuff… in the playlist. Please wait until your part of the queue is finished.")})
        let time = utils.tomins(info.length_seconds)
	      let seconds = time[1]
        if(seconds < 9) seconds = "0" + time[1].toString()
        global.queue.push({"url":message.content.split(" ")[1], "info":info.title, "user":message.author, "time":info.length_seconds, "minutes":time[0], "seconds":seconds})
        message.channel.send({embed:utils.embed("happy", `queued \`${info.title}\``)})
      }
    })
  }
}