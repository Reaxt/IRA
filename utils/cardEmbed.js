const Discord = require("discord.js")
//cardEmbed(cardDoc) returns a message embed created from a cardDoc.

// stores the string conversions of each rarity level. starts at 0
var rarities = ["", "★", "★★", "★★★", "★★★★", "★★★★★", "★★★★★★"]
var favSymbol = "🌟"
module.exports = (cardDoc) => {
	if (!cardDoc) throw err
	embed = new Discord.RichEmbed();

	if (cardDoc.favorite) 
		embed.setTitle(favSymbol +" "+ cardDoc.displayName)
	else 
		embed.setTitle(cardDoc.displayName)
	embed.setDescription(rarities[cardDoc.rarity] + " Lv. " + (Math.floor(cardDoc.level*100)/100))
	embed.setColor("#f759e8")
	embed.setImage(cardDoc.imgURL)
	embed.addField("Total Power", Math.floor(cardDoc.totalPwr))
	let owner = client.users.get(cardDoc.owner)
	embed.setFooter(owner.username, owner.avatarURL)
	return embed
}