const Discord = require("discord.js");
module.exports = {
  name:"!sendTo",
  desc:"Send a message to a specific channel.",
  hidden:true,
  func:function(message){
  	config = global.config;
  	let channelid = message.content.split(" ")[1];
  	global.client.guilds.get(config.guildid).channels.get(channelid).send(message.content.substring(message.content.indexOf(" ", message.content.indexOf(" ")+1)));
  }
}