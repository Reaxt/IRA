var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!forceSkip",
  desc:"Skips the current song (old implementation that may help debugging)",
  mod:true,
  music:true,
  func:function(message){
    try {music.events.emit("skip", message)} catch(err) {
      message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``)]})
    }
  }
}
//en dme
