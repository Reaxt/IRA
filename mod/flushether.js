const Discord = require("discord.js")
var utils = require("../utils/index.js")
const NeDB = require('nedb')
var confirmEmote = "✅"
var cancelEmote = "❌"

module.exports = {
  name:"!flushEther",
  desc:"Flushes the Ether out of everyone's accounts.",
  mod:true,
  func:async function(message){
    let things = message.content.split(" ")
    var db = new NeDB({filename: './carddata.db'})
    let sentMsg = await message.channel.send({embeds:[utils.embed("sad", `YOU SURE YOU WANNA FLUSH EVERYONE'S ETHER RESERVES?`)]});
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
                		console.log("Failed to load userdata! Err: " + err);
                	}
                });

                db.find({}, (err, docs) => {
                    for (let docKey in docs) {
                        let doc = docs[docKey]
                        if (doc.eventCardCoins) {
                            doc.eventCardCoins = 0;
                        }
                        db.update({_id:doc._id}, doc);
                    }
                    sentMsg.edit({embeds:[utils.embed(`happy`,`\`parsed ${docs.length} users\``)]})
                })
            } catch(err) {
                sentMsg.edit({embeds:[utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")]})
                }
        } else if (r.emoji.name == cancelEmote) {
            collector.stop()
			sentMsg.reactions.removeAll()
			sentMsg.edit({embeds:[utils.embed(`happy`,`ETHER FLUSH CANCELLED!`)]})
		}
    })
    }
}
