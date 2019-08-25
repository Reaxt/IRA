var utils = require("../utils/index.js")
const Discord = require("discord.js")
const fs = require("fs")

// var shopPageLength = 10;
var shopList;
const numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]

const symbols = {
    "coins":"",
    "eventCardCoins":"🔹"
}

const eventTypes = JSON.parse(fs.readFileSync("./events/eventTypes.json"))

function buyItem(message, user, shopItem) {
    global.usermanager.getUser(message, user).then(doc => {
        if (doc[shopItem.currency] && doc[shopItem.currency] >= shopItem.price) {
            global.usermanager.updateUser(message, user, {$inc: {[shopItem.currency]:shopItem.price*-1}}).then(doc => {
				shopItem.func(message).catch(err=>{
					// refund on error
					global.usermanager.updateUser(message, user, {$inc: {[shopItem.currency]:shopItem.price}})
					message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
				})
			}).catch(err => {
				message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
			})


        } else {
            message.channel.send({embed:utils.embed('angry', "You don't have the funds for that.")})
        }
    }).catch(err => {
        message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
    })
}

module.exports = {
  name:"!cardShop",
  desc:"Buy cards here!",

  func:function(message){
  	let arg = message.content.split(" ")[1]
  	if (arg && typeof parseInt(arg) === 'number' && arg <= shopList.length && arg > 0) {
  		return buyItem(message, message.author, shopList[arg-1])
  	}

  	let shopEmbed = new Discord.RichEmbed().setTitle("Heaven Grand Order").setColor("#ff2ecb")
  	global.usermanager.getUser(message, message.author).then(userDoc => {
  		shopEmbed.setDescription(`${message.author.username}, you have ${userDoc.coins} AbbyCoin and ${userDoc.eventCardCoins?userDoc.eventCardCoins:0}🔹`)
  		for (let i = 0; i < shopList.length; i++) {
	  		shopEmbed.addField(`${(i+1)}. **${shopList[i].name}**`,`${shopList[i].price}${symbols[shopList[i].currency]}`, true)
	  	}
	  	shopEmbed.setFooter("Ether Shards🔹 can be earned by participating in active events. Careful - they'll expire at the end of the event!")


		message.channel.send({embed:shopEmbed}).then(sentMsg => {
	  		var i = 0
	    	utils.numreact(sentMsg, i, Math.min(numreactions.length, shopList.length))

			let collector = sentMsg.createReactionCollector(
				(reaction, user) =>  numreactions.includes(reaction.emoji.name) && user.id === message.author.id,  {time:30000}
			)
			collector.on('collect', r => {
				let num = numreactions.indexOf(r.emoji.name)
				if (num < shopList.length) {
					buyItem(message, message.author, shopList[num])
					sentMsg.delete();
				}
			})
	  	})
  	}).catch(err => {
  		message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
  	})
  	
  }
}

var shopList = [
	{
        name:"Base",
        desc:"The main pool of cards.",
        price:300,
        currency:"coins",
		func:function(message, doc){
			return new Promise((resolve, reject) => {
				global.cardmanager.rollCard(message, message.author).then((cardDoc) => {
					message.channel.startTyping()
					let originalPwr = cardDoc.attack + cardDoc.defense
					cardDoc.attack = Math.floor((1.2 + (Math.random()*0.8)) * cardDoc.attack)
					cardDoc.defense = Math.floor((1.2 + (Math.random()*0.8)) * cardDoc.defense)
					let totalPwr = cardDoc.attack + cardDoc.defense
					cardDoc.level = totalPwr / originalPwr
	
					setTimeout(()=> {
						message.channel.send(`**${message.member.displayName}**, Your new card!`, {embed:utils.cardEmbed(cardDoc)})
						message.channel.stopTyping()
						resolve()
					}, 1500)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
]
// programatically add event pull types from the eventTypes data file
for (let prop in eventTypes) {
	if(eventTypes.hasOwnProperty(prop) ) {
		shopList.push({
			name:prop,
			desc:"",
			price:eventTypes[prop],
			currency:"eventCardCoins",
			func:function(message, doc){
				return new Promise((resolve, reject) => {
					global.cardmanager.rollEventCard(message, message.author, prop).then((cardDoc) => {
						message.channel.startTyping()
						let originalPwr = cardDoc.attack + cardDoc.defense
						cardDoc.attack = Math.floor((1.2 + (Math.random()*0.8)) * cardDoc.attack)
						cardDoc.defense = Math.floor((1.2 + (Math.random()*0.8)) * cardDoc.defense)
						cardDoc.totalPwr = cardDoc.attack + cardDoc.defense
						cardDoc.level = cardDoc.totalPwr / originalPwr
		
						setTimeout(()=> {
							message.channel.send(`**${message.member.displayName}**, Your new card!`, {embed:utils.cardEmbed(cardDoc)})
							message.channel.stopTyping()
							resolve()
						}, 1500)
					}).catch(err => {
						reject(err)
					})
				})
			}
		})
	} 
}