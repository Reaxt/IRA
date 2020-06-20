const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (user) => {

    let embed = new Discord.MessageEmbed()
    .setTitle(`🔨 Member ${user.username} has been unbanned from the server`)
    .setColor("BLUE")
    .setThumbnail(user.avatarURL())
    .setFooter(user.id)

    user.client.guilds.cache.get(config.guildid).channels.cache.get(config.logs).send({embed})
  }
