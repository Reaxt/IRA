const Discord = require("discord.js");
module.exports = {
  name:"!setNickname",
  desc:"Changes my nickname in this server",
  hidden:true,
  func:function(message){
  	message.guild.fetchMember(this.user).then( (me) => {
  		me.setNickname(message.content.substring(message.content.indexOf(" ")+1))
  		message.channel.send("That should do it.");
  	}
  	);
  }
}