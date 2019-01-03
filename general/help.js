const Discord = require("discord.js")
const fs = require("fs")
var utils = require("../utils/index.js")
var general = require("./index.js")
var music = require("../music/index.js")
var shitpost = require("../shitpost/index.js")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = {
  name:"!help",
  desc:"Lists all commands",
  func:function(message){
  let client = this
  let gencommands = []
  let musiccommands = []
  let shitpostcommands = []
  fs.readdir("./general", function(err, items) {
    if(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``, "RED")})
    } else {
      items.splice(items.indexOf("index.js"), 1)
      console.log(items)
      gencommands = items.map(element => utils.elementToString(element, general))
      fs.readdir("./music", function(err, items) {
        if(err) {
          message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``, "RED")})
        } else {


          items.splice(items.indexOf("index.js"), 1)

          items.splice(items.indexOf("lib"), 1)
          musiccommands = items.map(r => utils.elementToString(r, music))
          fs.readdir("./shitpost", function(err, items) {
            if(err) {
              message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``, "RED")})
            } else {

              items.splice(items.indexOf("index.js"), 1)
              shitpostcommands = items.map(element => utils.elementToString(element, shitpost))

              let embed = new Discord.RichEmbed()
              .setTitle(`Here's what I can do! ${config.version}`)
              .setColor("#f7ce55")
              .setThumbnail(client.user.avatarURL)
              .addField("**General Commands**", gencommands.join(""), true)
              .addField("**Music Commands**", musiccommands.join(""), true)
              .addField("**Shitpost Commands**(only in shitpost central or after hours)", shitpostcommands.join(""), true)
              .setFooter("Created by Reaxt", client.users.get('163052863038291970').avatarURL )
              message.author.send({embed}).then(() => {
                message.react("👌")
              })
            }
          })
        }
      })
}
  })




  }
}
