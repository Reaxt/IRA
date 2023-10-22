var utils = require("../utils/index.js")
const Discord = require("discord.js")
const fs = require("fs")

// var shopPageLength = 10;
var shopList;
var shopMap = {};
const numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]

const symbols = {
    "coins":"",
    "eventCardCoins":"🔹"
}
// ether 🔹
// cogs ⚙️

var monkeyQuotes = {
	"image": "https://cdn.discordapp.com/attachments/512493868839731201/978463721875705966/unknown.png",
	"quotes": [
		"Don't tell her I can talk.",
		"Get this bitch a banana.",
		"You haven't seen any balloons around here, right?",
		"Mind pointing me to the bathroom?"
		]
}

var nerfQuotes = {
	"image": "https://cdn.discordapp.com/attachments/250999587156787210/1165395874902450376/PLACEHOLDER_nerfpic.png",
	"quotes": [
		"Ether Shards 🔹 can be purchased in the shop. Careful - they'll expire at the end of the event!",
		"Crystallized Ether is rare. I'd love to have some as a snack sometime...",
		"Remember, this isn't gambling! You're spending money for randomized rewards with no monetary value.",
		"I love capitalism.",
		"If you buy ten packs at once, you get an extra chance to get no additional rare cards!",
		"No, cards don't contain the souls of the people they depict. Not yet, anyways.",
		"\"Foil Cards\"? Oh yea, I've already used all the ones I found for cooking!"
		]
}

var shopQuotes = [monkeyQuotes, nerfQuotes]

const eventTypes = JSON.parse(fs.readFileSync("./events/eventTypes.json"))

function buyItem(message, user, shopItem) {
    global.usermanager.getUser(message, user).then(doc => {
        if (doc[shopItem.currency] && doc[shopItem.currency] >= shopItem.price) {
            global.usermanager.updateUser(message, user, {$inc: {[shopItem.currency]:shopItem.price*-1}}).then(doc => {
				shopItem.func(message).catch(err=>{
					// refund on error
					global.usermanager.updateUser(message, user, {$inc: {[shopItem.currency]:shopItem.price}})
					message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
				})
			}).catch(err => {
				message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
			})


        } else {
            message.channel.send({embed:utils.embed('angry', "YOU'RE TOO BROKE TO GAMBLE ON CARDBOARD")})
        }
    }).catch(err => {
        message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
    })
}

module.exports = {
  name:"!cardShop",
  desc:"Buy cards here!",

  func:function(message){
	let arg = message.content.substr(10);
	if (arg) {
	  if (typeof parseInt(arg) === 'number' && arg <= shopList.length && arg > 0) {
		  return global.usermanager.buyItem(message, message.author, shopList[arg-1].price, shopList[arg-1].func)
	  } else 
	  if (shopMap[arg.toLowerCase()]) {
		  return global.usermanager.buyItem(message, message.author, shopMap[arg.toLowerCase()].price, shopMap[arg.toLowerCase()].func)
	  }
	} 

  	let shopEmbed = new Discord.MessageEmbed().setTitle("Heaven Grand Order").setColor("#ff2ecb")
  	global.usermanager.getUser(message, message.author).then(userDoc => {
  		shopEmbed.setDescription(`\`${message.author.username}\`, YOU HAVE \`${userDoc.coins}\` ABBYCOIN AND \`${userDoc.eventCardCoins?userDoc.eventCardCoins:0}\`${symbols.eventCardCoins}`)
  		for (let i = 0; i < shopList.length; i++) {
	  		shopEmbed.addField(`${(i+1)}. **${shopList[i].name}**`,`${shopList[i].price}${symbols[shopList[i].currency]}`, true)
	  	}
		let quoteSpeaker = utils.getrandom(shopQuotes)
	  	shopEmbed.setFooter(utils.getrandom(quoteSpeaker["quotes"]), quoteSpeaker["image"])


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
  		message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
  	})
  	
  }
}

var shopList = [
	{
		name:"Base",
		aliases:["base"],
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
					global.cardmanager.updateCard(cardDoc).catch(err => reject(err))
	
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
			aliases:[prop.toLowerCase()],
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
						global.cardmanager.updateCard(cardDoc).catch(err => reject(err))
		
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

// auto fill aliases to map
for (let i = 0; i < shopList.length; i++) {
	for (let j = 0; j < shopList[i].aliases.length; j++) {
		shopMap[shopList[i].aliases[j].toLowerCase()] = shopList[i];
	}
}