const utils = require("../utils/index.js")
const Discord = require("discord.js")
module.exports = {
  name:"!queue",
  desc:"lists the queue",
  music:true,
  func:function(message){
    if(global.queue.length === 0) return message.channel.send({embeds:[utils.embed("sad","THERE'S NOTHING TO PLAY ADD SOMETHING WITH COMMAND[`!add`]")]})
    aamessage = []
    global.queue.forEach(function(element) {
    aamessage.push(`${global.queue.indexOf(element)}-- \`${element["info"]}\` QUEUED BY \`${element["user"].username}\` \n`)
    })
    message.channel.send({embeds:[utils.embed("happy",(aamessage.join("")))]})

  }
}
