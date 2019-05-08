const Discord = require("discord.js")
var utils = require("../utils/index.js")

var rarities = ["", "★", "★★", "★★★", "★★★★", "★★★★★", "★★★★★★"]
var arrowreactions = ["⬅", "➡"]
var numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]
var favEmote = "💖"
var unFavEmote = "💔"
var fuseEmote = "🌀"
var confirmEmote = "✅"
var cancelEmote = "❌"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// A function which fills an embed's fields with a portion of the card array cards[].
function listCards(cards, embed, start, end) {
	embed.fields = [];
	for (let i = start; i < end; i++) {
		if (cards[i].favorite)
			embed.addField("🌟 "+(i+1) +". "+ cards[i].displayName, `${rarities[cards[i].rarity]} ${Math.floor(cards[i].totalPwr)}`)
		else 
			embed.addField((i+1) +". "+ cards[i].displayName, `${rarities[cards[i].rarity]} ${Math.floor(cards[i].totalPwr)}`)
	}
	embed.setFooter(`Page ${(start/10)+1}/${Math.ceil((cards.length/10))}`)
	return embed
}
// A card has a "favorite" function and a fuse function. They are activated by a reaction collector.
async function cardDisplayReactions (message, sentMsg, cardEmbed, cardDoc) {

	let fuseConfirmState = false;

	let collector = sentMsg.createReactionCollector(
		(reaction, user) => (reaction.emoji.name == favEmote || reaction.emoji.name == unFavEmote || reaction.emoji.name == fuseEmote || reaction.emoji.name == confirmEmote || reaction.emoji.name == cancelEmote) && user.id === message.author.id, {time:30000}
	)
	collector.on('collect', r=> {
		if (fuseConfirmState === true) {
			if (r.emoji.name == confirmEmote) {
				collector.stop("accept")
				sentMsg.clearReactions()
				sentMsg.edit("`----Fusing----`")
				let oldLevel = cardDoc.level;
				global.cardmanager.fuseCards(message, message.author, cardDoc, (fusedCard, numFused) => {
					setTimeout(() => {
						sentMsg.edit(`Fuse result! ${numFused} card(s) consumed. ${Math.floor(fusedCard.level)-Math.floor(oldLevel)} level(s) gained.`, {embed:utils.cardEmbed(fusedCard)})
					}, 1500)
				})
			} else if (r.emoji.name == cancelEmote) {
				fuseConfirmState == false;
				sentMsg.edit("Fuse cancelled.", {embed:utils.cardEmbed(cardDoc)})
			}
		} else if (r.emoji.name == favEmote) {
			global.cardmanager.favoriteCard(sentMsg, cardDoc)
			cardDoc.favorite = true;
			sentMsg.edit("You have just favorited this card. It will not be consumed for fusion.", {embed:utils.cardEmbed(cardDoc)})
		} else if (r.emoji.name == unFavEmote) {
			global.cardmanager.unFavoriteCard(sentMsg, cardDoc)
			cardDoc.favorite = false;
			sentMsg.edit("You have unfavorited this card. It may be consumed in fusion.", {embed:utils.cardEmbed(cardDoc)})
		} else if (r.emoji.name == fuseEmote) {
			sentMsg.edit("You have selected the option to FUSE. Warning- this will consume any duplicate cards of this type that you have not favorited! Confirm?", {embed:utils.cardEmbed(cardDoc)}).catch((err) => {
				message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")}) 
			})
			fuseConfirmState = true;
			sentMsg.react(confirmEmote).then(
			setTimeout(function() {
				sentMsg.react(cancelEmote)
			}, 500))
		}
	})

	sentMsg.react(favEmote).catch()
	await sleep(500)
	sentMsg.react(unFavEmote).catch()
	await sleep(500)
	sentMsg.react(fuseEmote).catch()
}
module.exports = {
	name:"!cards",
	desc:"Lists your card collection. Sort by power or rarity.",
	func:function(message){

		// sort type distinction
		let sort; 
		let lowercase = message.content.toLowerCase();
		if (lowercase.includes(" rarity")) sort = "type"
		else if (lowercase.includes(" type")) sort = "type"
		else if (lowercase.includes(" power")) sort = "power"
		else sort = "type"

		let user = message.author

		listEmbed = new Discord.RichEmbed()
		listEmbed.setAuthor(`${user.username}'s Cards`, user.avatarURL)
		listEmbed.setColor("#f759e8")

		cardList = global.cardmanager.getCardList(message, message.author, sort).then(cards => {
			if (cards.length == 0) 
				return message.channel.send({embed:utils.embed('sad', "You haven't acquired any cards yet. Go to the shop to get some!")})
			listCards(cards, listEmbed, 0, Math.min(10, cards.length))
			message.channel.send({embed:listEmbed}).then(function(sentMsg) {
				// reaction collection
				sentMsg.react(arrowreactions[0])
				setTimeout(function() {
					sentMsg.react(arrowreactions[1])
					var i = 0;
			    	utils.numreact(sentMsg, 0, numreactions.length)

					let collector = sentMsg.createReactionCollector(
						(reaction, user) =>  (arrowreactions.includes(reaction.emoji.name) || numreactions.includes(reaction.emoji.name)) && user.id === message.author.id,  {time:30000}
					)
					collector.on('collect', r => {
						if (r.emoji.name == arrowreactions[0] && i >= 10) {
							i -= 10
							sentMsg.edit({embed:listCards(cards, listEmbed, i, Math.min(i+10, cards.length)) })
						}
						if (r.emoji.name == arrowreactions[1] && i < cards.length-10) {
							i += 10
							sentMsg.edit({embed:listCards(cards, listEmbed, i, Math.min(i+10, cards.length)) })
						}
						let num = numreactions.indexOf(r.emoji.name)
						if (num != -1 && num < cards.length-i) {
							let cardEmbed = utils.cardEmbed(cards[i+num])
							collector.stop("accept")
							sentMsg.delete()
							message.channel.send({embed:cardEmbed}).then((cardMsg) => {
								cardDisplayReactions(message, cardMsg, cardEmbed, cards[i+num])
							})
						}
							
					})
				}, 500)
				
			})
		}).catch(err => {
			message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")}) 
		})
	}
}