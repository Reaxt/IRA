const Discord = require("discord.js");
module.exports = { 
	hidden:true,
	func: function(messageContent) {
		global.client.fetchUser(global.config.owner).then( 
			(owner) => {owner.send(messageContent)}
		);
	}
}