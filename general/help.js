const Discord = require("discord.js")
const fs = require("fs")
var utils = require("../utils/index.js")
var general = require("./index.js")
var music = require("../music/index.js")
var shitpost = require("../shitpost/index.js")
var dj = require("../dj/index.js")
//var config = global.config;
module.exports = {
  name:"!help",
  desc:"Lists my commands",
  func:async function(message){
    let client = this
    let gencommands = []
    let musiccommands = []
    let djcommands = []
    let shitpostcommands = []
    let modcommands = []
    let botcommands = []
    function filterItems(items) {
      for (var i = 0; i < items.length; ) {
        if (items[i] == "index.js") items.splice(i, 1)
        else if (!items[i].endsWith(".js")) items.splice(i , 1)
        else i++;
      }
    }
    try {
      items = fs.readdirSync("./general");
      filterItems(items)
      gencommands = items.map(element => utils.elementToString(element, general))
      items = fs.readdirSync("./music");
      filterItems(items)
      musiccommands = items.map(r => utils.elementToString(r, music))
      items = fs.readdirSync("./dj");
      filterItems(items)
      djcommands = items.map(r => utils.elementToString(r, dj))
      items = fs.readdirSync("./shitpost")
      filterItems(items)
      shitpostcommands = items.map(element => utils.elementToString(element, shitpost))

      let avatarURL = await client.users.fetch('163052863038291970').avatarURL;
      let embed = new Discord.MessageEmbed()
      .setTitle(`Here's what I can do! ${config.version}`)
      .setColor("#f759e8")
      .setThumbnail(client.user.avatarURL)
      .addField("**General Commands**", gencommands.join(""), true)
      .addField("**Music Commands**", musiccommands.join(""), true)
      .addField("**DJ Commands** (requires DJ role)", djcommands.join(""), true)
      .addField("**Shitpost Commands**", shitpostcommands.join(""), true)
      .setFooter("Created by Reaxt, Et al.", avatarURL );
      message.author.send({embed}).then(() => {
        message.react("👌")
      });

    } catch (err) {
      message.channel.send({embed:utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
    }

  }
}