const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (member) => {

    let embed = new Discord.RichEmbed()
    .setTitle(`📤Member ${member.user.username} has left, or been kicked from the server`)
    .setColor("RED")
    .setThumbnail(member.user.avatarURL)
    member.client.guilds.get(config.guildid).channels.get(config.logs).send({embed})
  }
