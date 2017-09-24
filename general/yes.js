const Discord = require("discord.js")
module.exports = {
  name:"!yes",
  desc:"yes",
  func:function(message){
    message.channel.send(`***YES***`, {files:["./pictures/FatYoshi.jpg"]})
  }
}
