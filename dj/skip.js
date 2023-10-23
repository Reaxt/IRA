var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!skip",
  desc:"Skips the current song",
  music:true,
  func:function(message){
  	if(!message.guild.voice.channel) return message.channel.send({embeds:[utils.embed("sad","I'M NOT EVEN IN A VOICE CHANNEL RIGHT NOW")]})
  	if(message.member.voice.channel =! message.guild.me.voice.channel) return message.channel.send({embeds:[utils.embed("sad", "I CAN'T HEAR YOU OVER THERE COME CLOSER")]})
  	if(!message.guild.voice.connection.dispatcher) return message.channel.send({embeds:[utils.embed("sad", "HOW CAN I SKIP SOMETHING THAT'S NOT PLAYING")]})
    try {music.events.emit("skip", message)} catch(err) {
      message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``)]})
    }
  }
}
//en dme
//Remind me to later
