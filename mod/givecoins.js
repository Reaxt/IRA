var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!giveCoins",
  desc:"money money money (place monetary amount after mentions)",
  mod:true,
  func:function(message){
    if (message.mentions.users.first()) {
      let amount = message.content.split(" ");
      amount = amount[amount.length-1]
      if (isNaN(amount)) return message.channel.send({embed:utils.embed("sad","COULD YOU SPEAK UP I COULDN'T GET A NUMBER INPUT FROM THAT.")})
      message.mentions.users.forEach(user => {
        global.usermanager.addCoins(message, user, parseFloat(amount));
      })
      if (message.mentions.users.size == 0) {
        return message.channel.send({embed:utils.embed("sad",`YOU GOTTA MENTION SOMEONE`)})
      } else if (message.mentions.users.size == 1) {
        return message.channel.send({embed:utils.embed("happy",`GAVE ${amount} ABBYCOIN TO ${message.mentions.users.first()}`)})
      } else {
        return message.channel.send({embed:utils.embed("happy",`GAVE ${amount} ABBYCOIN TO ${message.mentions.users.size} MEMBERS`)})
      }
    } else {
      message.channel.send({embed:utils.embed("malfunction", `YOU GOTTA MENTION SOMEONE`)})
    }
  }
}