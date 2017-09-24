const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (user) => {

    let embed = new Discord.RichEmbed()
    .setTitle(`🔨 Member ${user.username} has been banned from the server`)
    .setColor("RED")
    .setThumbnail(user.avatarURL)

    user.client.guilds.get(config.guildid).channels.get(config.logs).send({embed})
  }
