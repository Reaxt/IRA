var utils = require("../utils/index.js")
const Discord = require("discord.js")
const NeDB = require('nedb')

module.exports = {
  name:"!debt",
  desc:"how quickly can you contribute to the downfall of humanity?",

  func:function(message){
      var db = new NeDB({filename: './userdata.db'})
    	let user = message.author;
      if (message.mentions.members.first()) user = message.mentions.members.first() 
      let total_debt = 0
      let total_gains = 0
      try{
        db.loadDatabase(function (err) {
            if (err) {
                console.log("Failed to load userdata! Err: " + err);
            }
        });
        db.find({}, (err, docs) => {
          for (let docKey in docs) {
            let doc = docs[docKey]
            total_debt += doc.debt
            total_gains += doc.coins
          }
      })
      message.channel.send({embed: utils.embed("happy", `YOU GUYS TOOK \`${total_debt}\` COINS FROM ME AND ONLY HAVE \`${total_gains}\` COINS LEFT MEANING THE SERVER'S NET WORTH IS \`${total_gains - total_debt}\``)});
    } catch(err) {
      sentMsg.edit({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
      }
  }
}