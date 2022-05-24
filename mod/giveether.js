var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!giveEther",
  desc:"Reward a member for their event participation.",
  mod:true,
  func:function(message){
    if (message.mentions.users.first()) {
      let amount = message.content.split(" ");
      amount = amount[amount.length-1]
      if (isNaN(amount)) return message.channel.send({embed:utils.embed("sad","I COULDN'T GET A NUMBER INPUT FROM THAT.")})
      amount = Math.floor(Number(amount))
      message.mentions.users.forEach(user => {
        global.usermanager.updateUser(message, user, {$inc: {eventCardCoins:amount}}).catch(err => {
          message.channel.send("Failed on user "+ user.username)
        })
      })
      if (message.mentions.users.size == 0) {
        return message.channel.send({embed:utils.embed("sad",`YOU GOTTA MENTION SOMEONE`)})
      } else if (message.mentions.users.size == 1) {
        return message.channel.send({embed:utils.embed("happy",`GAVE ${amount}🔹 TO ${message.mentions.users.first()}!`)})
      } else {
        return message.channel.send({embed:utils.embed("happy",`GAVE ${amount}🔹 TO ${message.mentions.users.size} MEMBERS!`)})
      }
    } else {
      message.channel.send({embed:utils.embed("malfunction", "YOU GOTTA MENTION SOMEONE")})
    }
  }
}