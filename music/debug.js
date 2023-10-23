var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!debug",
  desc:"Checks for a stuck song and skips if appropriate",
  music:true,
  func:function(message){
    if(!message.guild.voice.connection) {
      message.channel.send({embeds: [utils.embed("sad", "NOTHING'S PLAYING")]})
      return;
    }
  	if(message.guild.voice.connection.speaking) {
    	message.channel.send({embeds: [utils.embed("sad", "WHAT DO YOU MEAN SOMETHING'S WRONG EVERYTHING LOOKS FINE TO ME")]})
  		return;
  	}
    try {
      music.events.emit("play", message);
      message.channel.send({embeds: [utils.embed("happy", "OH YEA THAT'S PRETTY WEIRD I THINK I FIXED IT THOUGH")]})
    } catch(err) {
      message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``)]})
    }
  }
}