const Discord = require("discord.js")
const utils = require("../utils/index.js")
const NeDB = require('nedb')
var confirmEmote = "✅"
var cancelEmote = "❌"
const Sentencer = require("sentencer")

module.exports = {
  name:"!updateCard",
  desc:"Updates a specific card in everyone's inventories using values from cards.json. Usage: !updateCard <cardName>",
  mod:true,
  func:async function(message){
    let things = message.content.split(" ")
    // things[1]: the name of the card (not displayName)
    if(!things[1]) return(message.channel.send({embed:utils.embed("malfunction", "`Usage: !updateCard <cardName>. (Do not use displayName)`")}))
    var db = new NeDB({filename: './carddata.db'})
    var archdb = new NeDB({filename: './carddata_archive.db'})
    var refCards = JSON.parse(fs.readFileSync("./events/cards.json"))
    let sentMsg = await message.channel.send({embed:utils.embed("sad", `YOU SURE YOU WANNA REWRITE \`${things[1]}\` IN EVERYONE'S INVENTORIES? THIS WILL REROLL THEIR ADJECTIVES. YOU CAN'T UNDO THIS. WE RECOMMEND MAKING AN ANNOUNCEMENT THAT THIS HAS BEEN DONE.`)});
    sentMsg.react(confirmEmote)
    sentMsg.react(cancelEmote)
    let collector = sentMsg.createReactionCollector(
		(reaction, user) => (reaction.emoji.name == confirmEmote || reaction.emoji.name == cancelEmote) && user.id === message.author.id, {time:30000}
	)
	collector.on('collect', r=> {
		if (r.emoji.name == confirmEmote) {
			collector.stop("accept")
			sentMsg.reactions.removeAll()
			try{
                db.loadDatabase(function (err) {
                    if (err) {
                        console.log("Failed to load carddata! Err: " + err);
                    }
                });
                archdb.loadDatabase(function (err) {
                    if (err) {
                        console.log("Failed to load archdata! Err: " + err);
                    }
                });
                let ourCard = null
                refCards.find({}, (err, refs) => {
                    for (let refKey in refs) {
                        let ref = refs[refKey]
                        if (ref.name === things[1]) {
                            ourCard = ref
                            break
                        }
                    }
                });
                db.find({}, (err, docs) => {
                    let count = 0
                    for (let docKey in docs) {
                        let doc = docs[docKey]
                        if (doc.name === things[1]) {
                            count++
                            archdb.insert(doc, function(err) {if (err) console.log(err)})
                            doc.displayName = ourCard.displayName
                            doc.imgURL = ourCard.imgURL
	                        doc.series = ourCard.series
                            doc.event = ourCard.event
                            doc.charOwner = ourCard.charOwner
                            doc.rarity = ourCard.rarity
                        }
                    }
                    sentMsg.edit({embed:utils.embed(`happy`, `\`parsed ${docs.length} cards and removed ${count}\``)})
                })
            } catch(err) {
                sentMsg.edit({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
                }
        } else if (r.emoji.name == cancelEmote) {
            collector.stop()
			sentMsg.reactions.removeAll()
			sentMsg.edit({embed:utils.embed(`happy`,`\`${things[1]} deletion cancelled.\``)})
		}
    })
    }
}
