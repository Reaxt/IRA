var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("./index.js")

module.exports = {
  name:"!voteskip",
  desc:"Votes to skip the current song",
  mod:true,
  func:function(message){
    if(!message.guild.voice.channel) return message.channel.send({embed:utils.embed("sad", `I\'m not in a voice channel.`)})
    if(message.member.voice.channelID != message.guild.me.voice.channelID) return message.channel.send({embed:utils.embed("sad", "You\'re not in the same voice channel as me.")})
    if(!message.guild.voice.connection.dispatcher) return message.channel.send({embed:utils.embed("sad", "I\'m not playing anything right now.")})
    let needed = Math.ceil(message.guild.voice.channel.members.size / 2)

    let notskipped = true
    if(!global.voteusers.includes(message.author.id)) {
      global.votes++
      global.voteusers.push(message.author.id)
      message.channel.send({embed:utils.embed("happy", `You have voted \`${global.votes}/${needed}\``)})
    } else {
      message.channel.send({embed:utils.embed("sad", `You already voted \`${global.votes}/${needed}"`)})
    }
    if(global.votes >= needed) {

      message.channel.send({embed:utils.embed("happy",`\`${global.votes}/${needed}\` Votes received. Yoink!`)})
      music.events.emit("skip", message)

    }


  }
}
