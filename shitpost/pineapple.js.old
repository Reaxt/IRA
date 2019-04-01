const Discord = require("discord.js")
var utils = require("../utils/index.js")
var fs = require("fs")
module.exports = {
  name:"!pineapple",
  desc:"pineapple",
  shitpost:true,
  hidden:true,
  func:function(message){
    fs.readdir("./pictures/PINEAPPLE", (err, files) => {
	if(err) return console.log(err);
      var embed = utils.embed("pineapple", "", "RED")
      message.channel.send({embed, files:[`./pictures/PINEAPPLE/pine${Math.floor((Math.random() * files.length) + 1)}.png`] })
    })

  }
}
