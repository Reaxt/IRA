const Discord = require("discord.js")
//cardEmbed(cardDoc) returns a message embed created from a cardDoc.

// stores the string conversions of each rarity level. starts at 0
var rarities = ["", "★", "★★", "★★★", "★★★★", "★★★★★", "★★★★★★"]
var favSymbol = "🌟"
module.exports = (cardDoc) => {
	if (!cardDoc) throw err
	let embed = new Discord.RichEmbed();
	let refCard = global.cardmanager.getRefCard(undefined, cardDoc.name)

	if (cardDoc.favorite) 
		embed.setTitle(favSymbol +" "+ cardDoc.displayName)
	else 
		embed.setTitle(cardDoc.displayName)
	embed.setDescription(rarities[cardDoc.rarity] + " Lv. " + (Math.floor(cardDoc.level*100)/100))
	embed.setColor("#f759e8")
	if (refCard)
		embed.setImage(refCard.imgURL)
	embed.addField("Series", refCard.series, inline=false)
	embed.addField("Attack", Math.floor(cardDoc.attack), inline=true)
	embed.addField("Defense", Math.floor(cardDoc.defense), inline=true)
	let owner = client.users.get(cardDoc.owner)
	embed.setFooter(owner.username, owner.avatarURL)
	return embed
}