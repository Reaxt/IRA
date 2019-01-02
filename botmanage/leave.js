var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!leave",
  desc:"Makes the bot leave the voice channel and reset the queue.",
  music:true,
  func:function(message){
    try {music.events.emit("end", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }

  }
}