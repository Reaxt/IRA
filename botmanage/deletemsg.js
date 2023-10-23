const Discord = require("discord.js");
module.exports = {
  name:"!deleteMsg",
  desc:"Deletes a message that I've sent.",
  hidden:true,
  func:function(message){
  	let msgid = message.content.split(" ")[1];
  	message.channel.fetchMessage(msgid).then( target => {
  		if (target.author.id == this.user.id) target.delete();
  		else target.delete();//message.channel.send({embeds:[utils.embed("angry", `I'll only delete my own messages with this.`)]})
  		// when you powertrip
  	});
  }
}