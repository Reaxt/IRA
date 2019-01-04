const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (message) => {
    if(message.author.id === "172002275412279296") return
    if(message.author === message.client.user) return
    if(message.channel.type === "dm") return
    let embed = new Discord.RichEmbed()
    .setTitle(`🗑Message by \`${message.author.username}#${message.author.discriminator} deleted`)
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Message content was \`${message.content}\``)
    .setColor(`RED`)
    message.client.guilds.get(config.guildid).channels.get(config.logs).send({embed})
  }
