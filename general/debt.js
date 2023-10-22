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
      try{
        db.loadDatabase(function (err) {
            if (err) {
                console.log("Failed to load userdata! Err: " + err);
            }
        });
        db.find({}, (err, docs) => {
          let total_debt = 0
          let total_gains = 0
          let count = 0
          for (let docKey in docs) {
            let doc = docs[docKey]
            total_debt += doc.debt
            total_gains += doc.coins
            if(doc.debt > 0){
            count++}
          }
          message.channel.send({embed: utils.embed("happy", `YOU GUYS TOOK \`${total_debt}\` COINS FROM ME AND ONLY HAVE \`${total_gains}\` COINS LEFT MEANING THE SERVER'S NET WORTH IS \`${total_gains - total_debt}\`\n\`------------------------\`\n\`${count}\` DEBTORS OWE ME MONEY MAKING THE AVERAGE GAINS \`${total_gains / count}\` AND THE AVERAGE DEBT \`${total_debt / count}\` AND THE AVERAGE NET WORTH \`${(total_gains - total_debt) / count}\``)})
      })
    } catch(err) {
      message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")})
      }
  }
}