const Discord = require("discord.js")
var utils = require("../utils/index.js")
const NeDB = require('nedb')
var confirmEmote = "✅"
var cancelEmote = "❌"

module.exports = {
  name:"!cardClean",
  desc:"Cleans a specific card out of everyone's inventory. Usage: !cardClean <cardName>",
  mod:true,
  func:async function(message){
    let things = message.content.split(" ")
    // things[1]: the name of the card
    if(!things[1]) return(message.channel.send({embed:utils.embed("malfunction", "Usage: !cardClean <cardName>")}))
    var db = new NeDB({filename: './carddata.db'})
    var archdb = new NeDB({filename: './carddata_archive.db'})
    let sentMsg = await message.channel.send({embed:utils.embed("sad", `Are you sure you want to delete ${things[1]} from everyone's inventories? This cannot be undone.`)});
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
                db.find({}, (err, docs) => {
                    let count = 0
                    for (let docKey in docs) {
                        let doc = docs[docKey]
                        if (doc.name === things[1]) {
                            count++
                            archdb.insert(doc, function(err) {if (err) console.log(err)})
                            db.remove({_id:doc._id});
                        }
                    }
                    sentMsg.edit({embed:utils.embed(`happy`, `parsed ${docs.length} cards and removed ${count} cards`)})
                })
            } catch(err) {
                sentMsg.edit({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
                }
        } else if (r.emoji.name == cancelEmote) {
            collector.stop()
			sentMsg.reactions.removeAll()
			sentMsg.edit({embed:utils.embed(`happy`,`${things[1]} deletion cancelled.`)})
		}
    })
    }
}
