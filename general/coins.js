var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!coins",
  desc:"crippling debt",

  func:function(message){
    global.usermanager.getUser(message, message.author).then( function(userDoc) {
      message.channel.send({embed: utils.embed("happy", `You've got \`${userDoc.coins}\` AbbyCoin! (Net Worth: \`${userDoc.coins - userDoc.debt}\`)`)});
    });
  }
}