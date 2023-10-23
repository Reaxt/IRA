const Discord = require("discord.js")
var utils = require("../utils/index.js")
const fs = require("fs")
module.exports = {
  name:"!pollstart",
  desc:"Starts a poll (Give a message id and an amount)",
  poll:true,
  mod:true,
  func:function(message){
    let things = message.content.split(" ")
    if(parseInt(things[2]) > 10) return(message.channel.send({embeds:[utils.embed("malfunction", `I CAN'T COUNT OVER 10 TRY AGAIN`)]}))
    if(!things[2]) return(message.channel.send({embeds:[utils.embed("malfunction", "GIVE ME A NUMBER")]}))
    message.channel.messages.fetch(things[1]).then(message => {
      global.pollobject.pollamount = parseInt(things[2])
       let i = 0
       utils.numreact(message, i, global.pollobject.pollamount)
       global.pollobject.pollmessage = message.id
       pollobject.pollchan = message.channel.id
       fs.writeFileSync("./poll.json", JSON.stringify(global.pollobject))
    })
  }
}
