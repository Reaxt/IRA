const utils = require("../utils/index.js")
const Discord = require("discord.js")
module.exports = {
  name:"!queue",
  desc:"lists the queue",
  music:true,
  func:function(message){
    if(global.queue.length === 0) return message.channel.send({embed:utils.embed("sad","Nothings in the queue, add some with !add")})
    aamessage = []
    global.queue.forEach(function(element) {
    aamessage.push(`\`${global.queue.indexOf(element)} ${element["info"]}\` Queued by \`${element["user"].username}\` \n`)
    })
    message.channel.send({embed:utils.embed("happy",(aamessage.join("")))})

  }
}
