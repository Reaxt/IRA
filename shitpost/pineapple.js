const Discord = require("discord.js")
var utils = require("../utils/index.js")
var fs = require("fs")
module.exports = {
  name:"!pineapple",
  desc:"pineapple",
  shitpost:true,
  func:function(message){
    fs.readdir("./pictures/pineapple", (err, files) => {
      var embed = utils.embed("pineapple", "", "RED")
      message.channel.send({embed, files:[`./pictures/PINEAPPLE/pine${Math.floor((Math.random() * files.length) + 1)}.png`] })
    })

  }
}
