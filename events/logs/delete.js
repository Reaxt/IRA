const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (message) => {
    if(message.author.id === "172002275412279296") return
    if(message.author === message.client.user) return
    if(message.channel.type === "dm") return
    let embed = new Discord.MessageEmbed()
    .setTitle(`🗑Message by \`${message.author.username}#${message.author.discriminator} deleted`)
    .setDescription(`Message content was \`${message.content}\``)
    .setColor(`RED`)
    .setFooter(`#${message.channel.name}`, message.author.avatarURL())
    message.client.guilds.cache.get(config.guildid).channels.cache.get(config.logs).send({embed})
  }
