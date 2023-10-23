var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!leave",
  desc:"Makes the bot leave the voice channel and reset the queue.",
  music:true,
  func:function(message){
  	if(!message.guild.voice?.connection) return message.channel.send({embeds:[utils.embed("sad","HOW DO I LEAVE A PLACE I'M NOT IN")]})
    try {music.events.emit("end", message)} catch(err) {
      message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``)]})
    }
  }
}