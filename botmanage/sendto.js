const {Discord, Attachment} = require("discord.js");
const utils = require("../utils/index.js")

module.exports = {
  name:"!sendTo",
  desc:"Send a message to a specific channel-- mention it before your first message. Supports attachments.",
  hidden:true,
  func:function(message){

  	let mention = message.content.split(" ")[1]
  	let targetChannel;
  	let content;
    if (mention && mention.startsWith("<#") && mention.endsWith(">")) {
			targetChannel = message.mentions.channels.first()
			content = message.content.substring(message.content.indexOf(" ", message.content.indexOf(" ")+1))
			global.sendToDest = targetChannel;
		
    } else {
    	if (global.sendToDest) {
    		targetChannel = global.sendToDest;
    		content = message.content.substring(message.content.indexOf(" "))

    	} else{
    		return message.channel.send({embed:utils.embed("malfunction", "NOT A REAL CHANNEL")})

    	}
    }

    // band-aidy way to fix empty messages
    if (message.content.endsWith("!sendTo") || (message.content.endsWith(mention) && message.mentions.channels.first())) {
    	content = '';
    }

    // some stuff for effect
    targetChannel.startTyping();
    setTimeout(function() {
		if (targetChannel.type == "text") {
			if (message.attachments && message.attachments.size > 0) {
				const attachment = new Attachment(message.attachments.first().url)
				targetChannel.send(content, attachment).catch(err => {
					message.channel.send({embed:utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``,"Red")})
				})
			} else {
				targetChannel.send(content).catch(err => {
					message.channel.send({embed:utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``,"Red")})
				})
			}
		} else {
			message.channel.send({embed:utils.embed("malfunction", "IT HAS TO BE A *TEXT* CHANNEL")})
		}
		targetChannel.stopTyping();
    }, 700)
  }
}