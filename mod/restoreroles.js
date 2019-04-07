var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!restoreRoles",
  desc:"restores a member's roles",
  mod:true,
  func:function(message){

    if (message.mentions.members && message.mentions.members.first()) {
      let targetMember = message.mentions.members.first()
      global.usermanager.getRoles(message, targetMember).then(roles => {
        for(let i = 0; i < roles.length; i++) {
          targetMember.addRole(roles[i]).catch(err => {
            let failedRole = message.guild.roles.get(roles[i])
            if (failedRole)
              message.channel.send(`Failed adding role \`${failedRole.name}\`: \`${err}\``)
            else 
              message.channel.send(`Failed adding unknown role: \`${err}\``)
          })
        }
        message.channel.send({embed:utils.embed("happy",`Attempted to restore \`${roles.length}\` roles to **${targetMember.displayName}**`)})
      }).catch(err => {
        message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
      })
      
    } else {
      message.channel.send({embed:utils.embed("malfunction", "Please mention a user")})
    }
  }
}