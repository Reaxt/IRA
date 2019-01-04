const Discord = require("discord.js")
var fs = require("fs")
var config = JSON.parse(fs.readFileSync("./cfg.json"))
module.exports = (OldMessage, NewMessage) => {
    if(NewMessage.author.id === "172002275412279296") return
    if(NewMessage.author === NewMessage.client.user) return
    if(NewMessage.channel.type === "dm") return
    if(NewMessage.content === OldMessage.content) return
    let embed = new Discord.RichEmbed()
    .setTitle(`ℹ️ Message by ${OldMessage.author.username} has been edited`)
  .setColor("BLUE")
  .setThumbnail(OldMessage.author.avatarURL)
  .setDescription(`Original message was \n\`${OldMessage.content}\`\n new message was \n\`${NewMessage.content}\``)

    NewMessage.client.guilds.get(config.guildid).channels.get(config.logs).send({embed})
  }
