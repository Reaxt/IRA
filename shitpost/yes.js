const Discord = require("discord.js")
var utils = require("../utils/index.js")
module.exports = {
  name:"!yes",
  desc:"yes",
  func:function(message){
    var content = utils.embed(null, '***YES***').setImage('https://cdn.discordapp.com/attachments/213315795323846657/363774291499810818/FatYoshi.jpg')
    message.channel.send({embeds: [content]})
  }
}
