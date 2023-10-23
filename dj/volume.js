var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!volume",
  desc:`Set volume to specified value (default ${global.defaultVolume})`,
  music:true,
  func:function(message){
  	if(!message.guild.voice.connection) return message.channel.send({embeds:[utils.embed("sad","I'M NOT EVEN IN A VOICE CHANNEL RIGHT NOW")]})
  	if(message.member.voice.connection =! message.guild.me.voice.connection) return message.channel.send({embeds:[utils.embed("sad", "I CAN'T HEAR YOU OVER THERE COME CLOSER")]})
    if (isNaN(message.content.split(" ")[1])) return  message.channel.send({embeds:[utils.embed("sad","GIMMIE A NUMBER FOR THAT")]})
    try {music.events.emit("setVolume", message)} catch(err) {
      message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``)]})
    }
  }
}