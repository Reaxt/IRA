var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!saveRoles",
  desc:"saves a member's roles",
  mod:true,
  func:function(message){
    if (message.mentions.members && message.mentions.members.first()) {
      let targetMember = message.mentions.members.first()
      if (!targetMember.roles.cache) return message.channel.send("no roles found")
      let roles = targetMember.roles.cache.filter(e => e.name != "@everyone").keyArray()
      global.usermanager.saveRoles(message, targetMember, roles).then((doc) => {
        message.channel.send({embeds:[utils.embed("happy",`OK I SAVED \`${roles.length}\` ROLES TO **${targetMember.displayName}**`)]})
      }).catch((err) => {
        message.channel.send({embeds:[utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")]})
      })
    } else {
      message.channel.send({embeds:[utils.embed("malfunction", "YOU NEED TO MENTION A USER")]})
    }
  }
}