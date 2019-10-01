const Discord = require("discord.js")
const fs = require("fs")
var utils = require("../utils/index.js")
var general = require("../general/index.js")
var music = require("../music/index.js")
var shitpost = require("../shitpost/index.js")
var botmanage = require("../botmanage/index.js")
var mod = require("../mod/index.js")
var dj = require("../dj/index.js")
var config = global.config
function filterItems(items) {
  for (var i = 0; i < items.length; ) {
    if (items[i] == "index.js") items.splice(i, 1)
    else if (!items[i].endsWith(".js")) items.splice(i , 1)
    else i++;
  }
}
module.exports = {
  name:"!modhelp",
  desc:"Lists all commands",
  func:function(message){
  let client = this
  let gencommands = []
  let musiccommands = []
  let shitpostcommands = []
  let djcommands = []
  let modcommands = []
  let botcommands = []
  try {
    items = fs.readdirSync("./general");
    filterItems(items)
    gencommands = items.map(element => utils.elementToStringMod(element, general))
    items = fs.readdirSync("./music");
    filterItems(items)
    musiccommands = items.map(r => utils.elementToStringMod(r, music))
    items = fs.readdirSync("./shitpost")
    filterItems(items)
    shitpostcommands = items.map(element => utils.elementToStringMod(element, shitpost))
    items = fs.readdirSync("./dj");
    filterItems(items)
    djcommands = items.map(r => utils.elementToString(r, dj))
    items = fs.readdirSync("./mod")
    filterItems(items)
    modcommands = items.map(element => utils.elementToStringMod(element, mod))
    items = fs.readdirSync("./botmanage")
    filterItems(items)
    botcommands = items.map(element => utils.elementToStringMod(element, botmanage))
    
    let embed = new Discord.RichEmbed()
    .setTitle(`Here's what I can do! ${config.version}`)
    .setColor("#f759e8")
    .setThumbnail(client.user.avatarURL)
    .addField("**General Commands**", gencommands.join(""), true)
    .addField("**Music Commands**", musiccommands.join(""), true)
    .addField("**DJ Commands** (requires DJ role)", djcommands.join(""), true)
    .addField("**Mod Commands**", modcommands.join(""), true)
    .addField("**Bot Management Commands**", botcommands.join(""), true)
    .addField("**Shitpost Commands**(only in shitpost central or after hours)", shitpostcommands.join(""), true)
    .setFooter("Created by Reaxt and Jwapple", client.users.get('163052863038291970').avatarURL )
    message.author.send({embed}).then(() => {
      message.react("👌")
    });


  } catch (err) {
    message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``, "RED")})
  }


  }
}

/**
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
**/