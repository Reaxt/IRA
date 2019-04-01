var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!giveCoins",
  desc:"money money money (place monetary amount after mentions)",
  mod:true,
  func:function(message){
    if (message.mentions.members) {
      let amount = message.content.split(" ")[2];
      if (isNaN(amount)) return message.channel.send({embed:utils.embed("sad","Couldn't get a number input out of that.")})
      message.mentions.members.forEach(user => {
        global.usermanager.addCoins(message, user, parseFloat(amount));
      })
      return message.channel.send({embed:utils.embed("happy",`Gave ${amount} AbbyCoin to ${message.mentions.members.size} members!`)})
    } else {
      message.channel.send({embed:utils.embed("malfunction", "Please mention a user")})
    }
  }
}