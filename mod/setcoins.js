var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!setCoins",
  desc:"oh god mom please dont take my vbucks",
  mod:true,
  func:function(message){
    if (message.mentions.members.first()) {
      let amount = message.content.split(" ")[2];
      if (isNaN(amount)) return message.channel.send({embed:utils.embed("sad","Couldn't get a number input out of that.")})
      message.mentions.members.forEach(user => {
        global.usermanager.setCoins(message, user, parseFloat(amount))
      })
      return message.channel.send({embed:utils.embed("happy",`Set ${amount} AbbyCoin to ${message.mentions.members.size} members!`)})
    } else {
      message.channel.send({embed:utils.embed("malfunction", "Please mention a user")})
    }
  }
}