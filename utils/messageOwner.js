const Discord = require("discord.js");
module.exports = { 
	hidden:true,
	func: function(messageContent) {
		global.client.users.fetch(global.config.owner).then( 
			(owner) => {owner.send(messageContent)}
		);
	}
}