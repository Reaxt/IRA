const Discord = require("discord.js")
var utils = require("../utils/index.js")
var fs = require("fs")
module.exports = {
  name:"!pepsi",
  desc:"pepsi",
  shitpost:true,
  func:function(message){
    fs.readdir("./pictures/PEPSI", (err, files) => {
      var embed = utils.embed("pepsi", "", "RED")
      message.channel.send({embed, files:[`./pictures/PEPSI/pepsi${Math.floor((Math.random() * files.length) + 1)}.png`] })
    })

  }
}
