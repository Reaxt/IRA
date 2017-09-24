const Discord = require("discord.js")
var utils = require("../utils/index.js")
const fs = require("fs")
var mod = require("./index.js")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = {
  name:"!modhelp",
  desc:"Lists all the mod commands",
  mod:true,
  func:function(message){
    let general = []
    let music = []
    let poll = []
    fs.readdir("./mod", function(err, items) {
      if(err){
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``, "RED")})
      } else {

        items.splice(items.indexOf("index.js"), 1)
        items.forEach(r => {
          if(mod[r.slice(0, -3)].poll) {
            poll.push(`**${mod[r.slice(0, -3)].name}**: ${mod[r.slice(0, -3)].desc}`)
          } else if(mod[r.slice(0, -3)].music) {
            music.push(`**${mod[r.slice(0, -3)].name}**: ${mod[r.slice(0, -3)].desc}`)
          } else {
            general.push(`**${mod[r.slice(0, -3)].name}**: ${mod[r.slice(0, -3)].desc}`)
          }
        })

       }
       let embed = new Discord.RichEmbed()
       .setTitle(`IRA ${config.version} command menu`)
       .setColor("RED")
       .setThumbnail(message.client.user.avatarURL)
       .addField("General: \n", general.join("\n"), true)
       .addField("Music: \n", music.join("\n"), true)
       .addField("Poll: (only in shitpost central or after hours\n", poll.join("\n"), true)
       .setFooter("Created by Reaxt", message.client.users.get('163052863038291970').avatarURL )
       message.author.send({embed}).then(() => {
         message.react("👌")
       })
    })

  }
}
