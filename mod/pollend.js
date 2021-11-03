const Discord = require("discord.js")
var utils = require("../utils/index.js")
const fs = require("fs")
module.exports = {
  name:"!pollend",
  desc:"Ends any current poll",
  poll:true,
  mod:true,
  func:async function(message){
    if(global.pollobject.pollmessage === null) return message.channel.send({embed:utils.embed("malfunction", `WHAT THE HELL ARE YOU TALKING ABOUT THERE'S NO POLL RIGHT NOW`)})
    pollobject = JSON.parse(fs.readFileSync("./poll.json"))
    let channel = await message.channel.guild.channels.fetch(pollobject.pollchan)
    if (!channel) {
      return message.channel.send({embed:utils.embed("malfunction", `POLL MESSAGE MISSING`, "RED")})
    }
    let pollmessage = await channel.messages.fetch(pollobject.pollmessage)
    if (!pollmessage) {
      return message.channel.send({embed:utils.embed("malfunction", `POLL MESSAGE MISSING`, "RED")})
    }

    let pollsresults = pollmessage.reactions.map(r => `${r.emoji.name} HAS ${r.count - 1} REACTIONS \n`)
    message.channel.send({embed:utils.embed("happy", `THE POLL IS OVER \n ${pollsresults}`)})

    global.pollobject.pollmessage = null
    global.pollobject.pollchan = null

    fs.writeFileSync("./poll.json", JSON.stringify(global.pollobject))
  }
}
