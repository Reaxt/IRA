const Discord = require("discord.js")
var utils = require("../utils/index.js")
module.exports = {
  name:"!paint",
  desc:"Sends you the worlds best art program on earth",
  shitpost:true,
  func:function(message){
    message.channel.send({embed:utils.embed("happy", `Nothing Beats Tux Pain! Tux Paint is the worlds most technically advanced art program on earth! With every single feature you could possibly need! Download it now! http://www.tuxpaint.org/download/`)})
  }
}
