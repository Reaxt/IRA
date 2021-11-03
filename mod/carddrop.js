const Discord = require("discord.js")
var utils = require("../utils/index.js")
const reaction = "💠"

const hour = 60 * 60 * 1000;
module.exports = {
  name:"!cardDrop",
  desc:"Drops a special card by name. Usage: !cardDrop <cardName> <durationHrs> <genuine[optional]>",
  poll:true,
  mod:true,
  func:async function(message){
    let things = message.content.split(" ")
    // things[1]: the name of the card
    // things[2]: the duration in hours
    // things[3]: genuine true/false
    let genuine;
    if(!things[2] || isNaN(things[2])) return(message.channel.send({embed:utils.embed("malfunction", "Usage: !cardDrop <cardName> <durationHrs> <genuine[optional]>")}))
    if(things.length == 4) {
      genuine = (things[3] && things[3] != "false") ? true : false
    }

    let endTime = new Date(new Date().getTime() + Math.round(Number(things[2]))*hour)
    try {
      let doc = await global.cardmanager.createCardFromName(message, undefined, things[1])
      if (genuine) {
        doc.genuine = true
      }
      let sentMsg = await message.channel.send(`Card drop! React with ${reaction} to claim the card below.`, {embed:utils.cardEmbed(doc).setFooter(`This drop is valid for ${things[2]} hours.`)});
      global.dropmanager.createDrop(message, sentMsg, endTime.getTime(), reaction, things[1], genuine);
      sentMsg.react(reaction);
    } catch(err) {
      message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
    }
  }
}