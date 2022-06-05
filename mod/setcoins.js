var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!setCoins",
  desc:"oh god mom please dont take my vbucks",
  mod:true,
  func:function(message){
    if (message.mentions.members.first()) {
      let amount = message.content.split(" ")[2];
      if (isNaN(amount)) return message.channel.send({embed:utils.embed("sad","COULD YOU SPEAK UP I COULDN'T GET A NUMBER INPUT FROM THAT")})
      message.mentions.members.forEach(user => {
        global.usermanager.setCoins(message, user, parseFloat(amount))
      })
      return message.channel.send({embed:utils.embed("happy",`SET ${amount} ABBYCOIN FOR ${message.mentions.members.size} MEMBERS`)})
    } else {
      message.channel.send({embed:utils.embed("malfunction", "YOU GOTTA MENTION A USER")})
    }
  }
}