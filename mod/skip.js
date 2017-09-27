var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!skip",
  desc:"Skips the current song (ONLY USE WHEN SOMETHINGS ACTUALLY PLAYING)",
  mod:true,
  music:true,
  func:function(message){
    try {music.events.emit("skip", message)} catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
    }

  }
}
//en dme
