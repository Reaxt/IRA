var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!saveRoles",
  desc:"saves a member's roles",
  mod:true,
  func:function(message){
    if (message.mentions.members && message.mentions.members.first()) {
      let targetMember = message.mentions.members.first()
      global.usermanager.saveRoles(message, targetMember)
      return message.channel.send({embed:utils.embed("happy",`Saved \`${targetMember.roles.size-1}\` roles to **${targetMember.displayName}**`)})
    } else {
      message.channel.send({embed:utils.embed("malfunction", "Please mention a user")})
    }
  }
}