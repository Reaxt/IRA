const Discord = require("discord.js")
var utils = require("../utils/index.js")
const fs = require("fs")
module.exports = {
  name:"!pollend",
  desc:"Ends any current poll",
  poll:true,
  mod:true,
  func:async function(message){
    if(global.pollobject.pollmessage === null) return message.channel.send({embed:utils.embed("malfunction", `Theres no poll going on right now`)})
    pollobject = JSON.parse(fs.readFileSync("./poll.json"))
    let channel = await message.channel.guild.channels.fetch(pollobject.pollchan)
    if (!channel) {
      return message.channel.send({embed:utils.embed("malfunction", `Poll message missing`, "RED")})
    }
    let pollmessage = await channel.messages.fetch(pollobject.pollmessage)
    if (!pollmessage) {
      return message.channel.send({embed:utils.embed("malfunction", `Poll message missing`, "RED")})
    }

    let pollsresults = pollmessage.reactions.map(r => `${r.emoji.name} Has ${r.count - 1} reactions \n`)
    message.channel.send({embed:utils.embed("happy", `Poll ended! \n ${pollsresults}`)})

    global.pollobject.pollmessage = null
    global.pollobject.pollchan = null

    fs.writeFileSync("./poll.json", JSON.stringify(global.pollobject))
  }
}
