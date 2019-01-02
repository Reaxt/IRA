const Discord = require("Discord.js");
module.exports = {
  name:"!setName",
  desc:"Changes my name",
  hidden:true,
  func:function(message){
  	global.client.user.setName(message.content.substring(message.content.indexOf(" ")+1));
    message.channel.send("That should do it.");
  }
}