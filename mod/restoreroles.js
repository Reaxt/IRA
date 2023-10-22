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
          targetMember.roles.add(roles[i]).catch(err => {
            let failedRole = message.guild.roles.cache.get(roles[i])
            if (failedRole)
              message.channel.send(`FAILED TO ADD ROLE \`${failedRole.name}\`: \`${err}\``)
            else 
              message.channel.send(`FAILED TO ADD AN UNKNOWN ROLE: \`${err}\``)
          })
        }
        message.channel.send({embed:utils.embed("happy",`ATTEMPTED TO RESTORE \`${roles.length}\` ROLES TO **${targetMember.displayName}**`)})
      }).catch(err => {
        message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")})
      })
      
    } else {
      message.channel.send({embed:utils.embed("malfunction", "YOU NEED TO MENTION A USER")})
    }
  }
}