const Discord = require("discord.js")
var utils = require("../utils/index.js")
const jimp = require("jimp")
module.exports = {

  name:"inkling",
  desc:"Puts an image in the inklings eye",
  func:function(message) {
    if(message.attachments.size > 0) {
      if(message.attachments.first().filename.toLowerCase().endsWith(".png") || message.attachments.first().filename.toLowerCase().endsWith(".jpg")){
      console.log(message.attachments.first().url)
      message.channel.startTyping()
      jimp.read("./inkbase.jpg").then(function(inkbase) {

        jimp.read(message.attachments.first().url).then(function(overlay) {
          jimp.read("./inkeye.png").then(function(eye){
          inkbase.composite(overlay.resize(95, 95).opacity(0.5),273,113).composite(eye, 0, 0).getBuffer(jimp.MIME_JPEG, function(err, res) {
            console.log(res)
            message.channel.send({files:[{attachment:res, name:'inkling.jpg'}]})
            message.channel.stopTyping()
          })
        })})
      }).catch(function (err) {
    console.log(err)
})} else {
  message.channel.send("Please send an attachment in either .jpg or .png")
};
} else {
  message.channel.send("Please use an attachment")
}
  }

}

