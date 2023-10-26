const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (OldMessage, NewMessage) => {
    if(NewMessage.author.bot) return
    if(NewMessage.author === NewMessage.client.user) return
    if(NewMessage.channel.type === "dm") return
    if(NewMessage.content === OldMessage.content) return
    let embed = new Discord.MessageEmbed()
    .setTitle(`ℹ️ Message by ${OldMessage.author.username} has been edited`)
    .setColor("BLUE")
    .setDescription(`Original message was \n\`${OldMessage.content}\`\n new message was \n\`${NewMessage.content}\``)
    .setFooter(`#${OldMessage.channel.name}`, OldMessage.author.avatarURL())

    NewMessage.client.guilds.cache.get(config.guildid).channels.cache.get(config.logs).send({embed})
  }
