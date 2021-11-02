var utils = require("../utils/index.js")

module.exports = {
  name:"!voicekick",
  desc:"Kicks a user out of a voice channel",
  mod:true,
  func:function(message){

    let mention = message.content.split(" ")[1]
    if (mention.startsWith("<@") && mention.endsWith(">")) {
      if (message.mentions.members.first().voice.channel) {
        message.mentions.members.first().voice.setChannel(null)
      } else {
        message.channel.send({embed:utils.embed("sad", "HOW DO I KICK SOMEONE OUT OF A PLACE THEY'RE NOT INSIDE")})
      }
      

    } else {
      message.channel.send({embed:utils.embed("malfunction", "LITERALLY WHO CAN YOU MENTION THEM AGAIN")})
    }
  }
}
