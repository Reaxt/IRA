const Discord = require("Discord.js");
module.exports = {
  name:"!sendMsg",
  desc:"Sends something through me. Don't make me say something weird.",
  hidden:true,
  func:function(message){
  	message.channel.send(message.content.substring(message.content.indexOf(" ")+1));
  	message.delete();
  }
}