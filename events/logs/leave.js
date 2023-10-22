const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (member) => {

    let embed = new Discord.MessageEmbed()
    .setTitle(`📤Member ${member.user.username} has left, or been kicked from the server`)
    .setColor("Red")
    .setThumbnail(member.user.avatarURL())
    member.client.guilds.cache.get(config.guildid).channels.cache.get(config.logs).send({embed})
  }
