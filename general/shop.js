var utils = require("../utils/index.js")
const Discord = require("discord.js")

//var shopPageLength = 10;
var shopList;
var shopMap = {};
var numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]

var abbyQuotes = {
	"image": "https://cdn.discordapp.com/attachments/203334579166117888/528414646034628625/abbyhappy.png",
	"quotes":[
		"Remember to eat your peas! It's important to assert your dominance over the food chain.",
		"Hey, has anyone seen my nuggets? I left them in the recording room, I think.",
		"Remember: If no one saw you shoot that man, it never happened!",
		"If Herobrine spawns but there's no Steve around to see him, did he really spawn at all?",
		"Sorry, we don't accept Star Points!",
		"Sorry, we don't accept Robux!",
		"Sorry, we don't accept V-Bucks!",
		"Sorry, we don't accept Primogems!",
		"Sorry, we don't accept C-Stacks!",
		"Sorry, we don't accept Saint Quartz!",
		"Sorry, we don't accept Refined Metal!",
		"Sorry, we don't accept Continental Coins!",
		"Please help me get rid of these guns. I don't know what to do with them.",
		"AbbyCoin is verified and backed by a gold standard! Where is the gold stored? Uhh.. Sorry, if anyone found the drawer I'd be in big trouble.",
		"Sandal keeps telling me that I should sell 'leet pictures'. What are those?",
		"Maybe I did recognize the bodies in the water.. Ah, sorry, huh? What was I talking about?",
		"Saving up is for losers! Getting rich is my job, not yours!",
		"FLASH SALE! Everything's 0% off!",
		"All our cards are organically sourced!",
		"Someone came by yesterday asking for rent. Sandal, do you know what that is?",
		"HEAVEN GRAND ORDER, was that the one I played? Let's check it out.",
		"Remember to hit that subscribe button and ring the notification bell!",
		"She looked in my chest and she looked at a hundred diamonds...",
		"Sorry, what was that? I couldn't hear you over the sound of the AbbyCoin in my pockets.",
		"Ugh.. I don't want to do the dishes..",
		"As your cards level up, they'll gain one-of-a kind modifiers!",
		"ID-tagged soldiers fighting with ID-tagged guns... good thing we don't sell those here!",
		"'Funneling weapons'? How do you do that? Aren't guns too big to put in a funnel?",
		"Not everything that you make needs to be perfect! It can be relaxing to just practice without any expectations.",
		"Don't worry if your work isn't where you want it to be - it's just another step towards getting better!",
		"We all need a break sometimes! Living life is important for your art, too!",
		"Nerf won't let me sell any of her custom guns. She says they're \"her babies\", ugh."
]}

var sandalQuotes = {
	"image": "https://cdn.discordapp.com/attachments/512493868839731201/905100842460401724/sandalidle2x.gif",
	"quotes":[
		"THESE GUNS WONT DO SHIT ON ME. IM BUILT DIFFERENT",
		"I WANTED TO ADD ID-TAGS TO THE GUNS BUT ABBY SAID IT WOULD \`Make them impossible to resell\`",
		"I NEVER ASKED TO BE BORN Y'KNOW.",
		"GOT A COMPLAINT? GO CRY TO MANAGEMENT",
		"REFUNDS? GO CRY AT A SERAPHIM",
		"DON'T BE SUCH A DAMN PERFECTIONIST BITCH. GO DRAW FOR FUN",
		"HAVE YOU HAD A DAMN GLASS OF WATER TODAY",
		"POSTURE CHECK BITCH",
		"DO US BOTH A FAVOUR AND GO TAKE A \`10 minute\` BREAK FROM THE COMPUTER BUDDY",
		"ANGELS OWN THE FLOAT TRUST ME DUDE BUY MORE ETHER"
]}

var boltyQuotes = {
        "image": "https://cdn.discordapp.com/attachments/512493868839731201/1166883338926174338/emoji.png",
        "quotes": [
            "Bitch"
             ]
	}

module.exports = {
  name:"!shop",
  desc:"Opens the shop! Redeem your AbbyCoin for great prizes.",

  func:function(message){
  	let arg = message.content.substr(6);
  	if (arg) {
		if (typeof parseInt(arg) === 'number' && arg <= shopList.length && arg > 0) {
			return global.usermanager.buyItem(message, message.author, shopList[arg-1].price, shopList[arg-1].func)
		} else 
		if (shopMap[arg.toLowerCase()]) {
			return global.usermanager.buyItem(message, message.author, shopMap[arg.toLowerCase()].price, shopMap[arg.toLowerCase()].func)
		}
  	} 

  	let shopEmbed = new Discord.MessageEmbed().setTitle("Abby's Alley").setColor("#ff2ecb")
  	global.usermanager.getCoins(message, message.author).then(coins => {
  		shopEmbed.setDescription(`${message.author.username}, you have ${coins} AbbyCoin!`)
  		for (let i = 0; i < shopList.length; i++) {
	  		shopEmbed.addField(`${(i+1)}. ${shopList[i].icon} **${shopList[i].name}** - ${shopList[i].price}`, shopList[i].desc)
	  	}
		let abbyLength = abbyQuotes["quotes"].length
		let sandalLength = sandalQuotes["quotes"].length
		let totalquote = abbyLength + sandalLength + 1
		let randnum = utils.randrange(1, totalquote)
		let quoteSpeaker = boltyQuotes
		switch(true){
			case (randnum < abbyLength):
			  quoteSpeaker = abbyQuotes
			  break;
			case (randnum < sandalLength+abbyLength):
			  quoteSpeaker = sandalQuotes
			  break;
		  }
		let myquote = utils.getrandom(quoteSpeaker["quotes"])
		if (quoteSpeaker["image"] == abbyQuotes["image"]){
			myquote = "Abby says: " + myquote
		}
	  	shopEmbed.setFooter(myquote, quoteSpeaker["image"])


		message.channel.send({embed:shopEmbed}).then(sentMsg => {
	  		var i = 0
	    	utils.numreact(sentMsg, i, Math.min(numreactions.length, shopList.length))

			let collector = sentMsg.createReactionCollector(
				(reaction, user) =>  numreactions.includes(reaction.emoji.name) && user.id === message.author.id,  {time:30000}
			)
			collector.on('collect', r => {
				let num = numreactions.indexOf(r.emoji.name)
				if (num < shopList.length) {
					global.usermanager.buyItem(message, message.author, shopList[num].price, shopList[num].func)
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
		name:"Gun",
		aliases:["gun"],
		desc:"Oh jeez, this thing looks dangerous.",
		icon:"🔫",
		price:500,
		func:async function(message, doc){
			global.usermanager.getUser(message, message.author).then(userDoc => {
				if (!userDoc.gun || isNaN(userDoc.gun)) {
					userDoc.gun = 1
					global.usermanager.setUser(message, message.author, userDoc)
				} else {
					userDoc.gun++;
					global.usermanager.updateUser(message, message.author, {$inc:{gun:1}})
				}
				message.channel.startTyping()
				setTimeout(()=> {
					message.channel.send(`Alright, **${message.author.username}**, here you go...\nYou have ${userDoc.gun} guns.`)
					message.channel.stopTyping()
				}, 500)
				
			}).catch(()=> {
		  		message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
			})
		}
	},
	{
		name:"Ether Shard",
		aliases:["ether", "shard"],
		desc:"Crystallized Ether. Can be exchanged for event cards.",
		icon:"🔹",
		price:2500,
		func:async function(message, doc){
			global.usermanager.getUser(message, message.author).then(userDoc => {
				if (!userDoc.eventCardCoins || isNaN(userDoc.eventCardCoins)) {
					userDoc.eventCardCoins = 1
					global.usermanager.setUser(message, message.author, userDoc)
				} else {
					userDoc.eventCardCoins++;
					global.usermanager.updateUser(message, message.author, {$inc:{eventCardCoins:1}})
				}
				message.channel.startTyping()
				setTimeout(()=> {
                    message.channel.send(`Alright, **${message.author.username}**, here you go! \nYou have ${userDoc.eventCardCoins} Ether Shards. Spend them at the !cardShop!`)
					message.channel.stopTyping()
				}, 500)
				
			}).catch(()=> {
		  		message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
			})
		}
	}
]

// auto fill aliases to map
for (let i = 0; i < shopList.length; i++) {
	for (let j = 0; j < shopList[i].aliases.length; j++) {
		shopMap[shopList[i].aliases[j].toLowerCase()] = shopList[i];
	}
}