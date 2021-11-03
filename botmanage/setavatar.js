const Discord = require("discord.js");
module.exports = {
  name:"!setAvatar",
  desc:"Changes my avatar",
  hidden:true,
  func:function(message){
  	if (message.attachments.first() && message.attachments.first().url)
  		global.client.user.setAvatar(message.attachments.first().url);
  	else
  		global.client.user.setAvatar(message.content.split(" ")[1]);

    message.channel.send("OK I GUESS I'LL WEAR THAT");
  }
}