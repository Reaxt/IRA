var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("./index.js")

module.exports = {
  name:"!voteskip",
  desc:"Votes to skip the current song",
  mod:true,
  func:function(message){
    if(!message.guild.voice.channel) return message.channel.send({embed:utils.embed("sad", "I'M NOT EVEN IN A VOICE CHANNEL RIGHT NOW")})
    if(message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send({embed:utils.embed("sad", "I CAN'T HEAR YOU OVER THERE COME CLOSER")})
    if(!message.guild.voice.connection.dispatcher) return message.channel.send({embed:utils.embed("sad", "HOW CAN I SKIP SOMETHING THAT'S NOT PLAYING")})
    let needed = Math.ceil(message.guild.voice.channel.members.size / 2)

    let notskipped = true
    if(!global.voteusers.includes(message.author.id)) {
      global.votes++
      global.voteusers.push(message.author.id)
      message.channel.send({embed:utils.embed("happy", `YOU VOTED \`${global.votes}/${needed}\``)})
    } else {
      message.channel.send({embed:utils.embed("sad", `YOU CAN'T VOTE AGAIN \`${global.votes}/${needed}"`)})
    }
    if(global.votes >= needed) {

      message.channel.send({embed:utils.embed("happy",`\`${global.votes}/${needed}\` VOTES RECIEVED NEXT TRACK`)})
      music.events.emit("skip", message)

    }


  }
}
