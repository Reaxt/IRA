var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!coins",
  desc:"crippling debt",

  func:function(message){

  	let user = message.author;
    if (message.mentions.members.first()) user = message.mentions.members.first() 

    global.usermanager.getUser(message, user).then( function(userDoc) {
      message.channel.send({embed: utils.embed("happy", `YOU'VE GOT LIKE \`${userDoc.coins}\` ABBYCOIN I THINK (AND YOUR NET WORTH IS: \`${userDoc.coins - userDoc.debt}\`)`)});
    });
  }
}