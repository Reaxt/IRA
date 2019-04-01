const Discord = require("discord.js");
var utils = require("../utils/index.js")
module.exports = {
  name:"!videolink",
  desc:"Gets a screenshare video link for your voice channel",
  func:function(message){
  	var voiceChannel = message.member.voiceChannel
    if(!voiceChannel) return message.channel.send({embed:utils.embed("sad", "You need to be in a voice channel for that.")})

    // stuff for updating the url in #voice-chat description
    var urlString = "https://discordapp.com/channels/"+message.guild.id+"/"+message.member.voiceChannelID+"/"
    if(global.config.voice && message.channel.id == global.config.voice) {
      var expression = new RegExp("https:\/\/discordapp\.com\/channels\/"+message.guild.id+"\/..................\/")
      var newTopic = message.channel.topic.replace(expression, urlString)
      message.channel.setTopic(newTopic)
    }

    // stuff for making the message to send
    var content = utils.embed(null, 
    	`[\[ ${voiceChannel.name} \]](${urlString})`, 
    	"#5c6ddb", 
    	null);
    content.setTitle("🖥️ Screenshare Link");
    content.setFooter("Here's your video link!", "https://cdn.discordapp.com/attachments/203334579166117888/528414646034628625/abbyhappy.png")
    message.channel.send({embed: content})
  }
}