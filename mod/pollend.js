const Discord = require("discord.js")
var utils = require("../utils/index.js")
const fs = require("fs")
module.exports = {
  name:"!pollend",
  desc:"Ends any current poll",
  poll:true,
  mod:true,
  func:function(message){
    if(global.pollobject.pollmessage === null) return message.channel.send({embed:utils.embed("malfunction", `Theres no poll going on right now`)})
    pollobject = JSON.parse(fs.readFileSync("./poll.json"))
    message.channel.guild.channels.get(pollobject.pollchan).fetchMessage(pollobject.pollmessage).then(amessage => {


    let pollsresults = amessage.reactions.map(r => `${r.emoji.name} Has ${r.count - 1} reactions \n`)
    message.channel.send({embed:utils.embed("happy", `Poll ended! \n ${pollsresults}`)})

    global.pollobject.pollmessage = null
    global.pollobject.pollchan = null

    fs.writeFile("./poll.json", JSON.stringify(global.pollobject))
    })
  }
}
