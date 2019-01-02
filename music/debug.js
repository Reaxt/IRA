var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!debug",
  desc:"Checks for a stuck song and skips if appropriate",
  music:true,
  func:function(message){
  	if(message.guild.voiceConnection.speaking) {
    	message.channel.send({embed: utils.embed("sad", "I don't see anything wrong from my end.")})
  		return;
  	}
    try {
    	music.events.emit("skip", message);
		message.channel.send({embed: utils.embed("happy", "Seemed like something was off, I hope that took care of it!")})
    } catch(err) {
      	message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }

  }
}