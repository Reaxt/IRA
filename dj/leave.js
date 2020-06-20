var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!leave",
  desc:"Makes the bot leave the voice channel and reset the queue.",
  music:true,
  func:function(message){
  	if(!message.guild.voice?.connection) return message.channel.send({embed:utils.embed("sad","I am not in a voice channel..")})
    try {music.events.emit("end", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }
  }
}