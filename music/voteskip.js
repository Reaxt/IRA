var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("./index.js")

module.exports = {
  name:"!voteskip",
  desc:"Votes to skip the current song",
  mod:true,
  func:function(message){
    if(!message.client.voiceConnections.first()) return message.channel.send({embed:utils.embed("sad", `Sorry, im not in a voice channel. Bring me in one with !summon`)})
    if(message.member.voiceChannelID != message.guild.me.voiceChannelID) return message.channel.send({embed:utils.embed("sad", "Youre not in the same voice channel as me.")})
    if(!message.client.voiceConnections.first().speaking) return message.channel.send({embed:utils.embed("sad", "Sorry, im not playing anything right now")})
    let needed = Math.ceil(message.member.voiceChannel.members.size / 2)

    let notskipped = true
    if(!global.voteusers.includes(message.author.id)) {
      global.votes++
      global.voteusers.push(message.author.id)
      message.channel.send({embed:utils.embed("happy", `You have voted \`${global.votes}/${needed}\``)})
    } else {
      message.channel.send({embed:utils.embed("sad", `You already voted \`${global.votes}/${needed}"`)})
    }
    if(global.votes >= needed) {

      message.channel.send({embed:utils.embed("happy",`\`${global.votes}/${needed}\` Votes received`)})
      music.events.emit("skip", message)

    }


  }
}
