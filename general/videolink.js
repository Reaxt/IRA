const Discord = require("discord.js");
var utils = require("../utils/index.js")
module.exports = {
  name:"!videolink",
  desc:"Gets a screenshare video link for your voice channel",
  func:function(message){
  	var voiceChannel = message.member.voiceChannel
    if(!voiceChannel) return message.channel.send({embed:utils.embed("sad", "You need to be in a voice channel for that.")})

    var content = utils.embed(null, 
    	"Here's your video link! \nhttps://discordapp.com/channels/"+message.guild.id+"/"+message.member.voiceChannelID+"/", 
    	"#5c6ddb", 
    	message.member.voiceChannel.name);
    content.setTitle("🖥️ Screenshare Link");
    message.channel.send({embed: content})
  }
}