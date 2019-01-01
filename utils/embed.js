const Discord = require("discord.js")
module.exports = (expression, content, color, footer) => {
  var url = null
  var Ecolor = "#f7ce55"

  switch(expression) {
    case "happy":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414646034628625/abbyhappy.png"
      break;
    case "sad":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414649302122506/abbysad.png"
      break;
    case "malfunction":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414647573938186/abbymalfunction.png"
      Ecolor = "RED";
      break;
    case "angry":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414643962642465/abbyangry.png"
      break;
    case "gun":
      url = null;
      break;
    default:
      url = null;
      break;
  }
  if(url === "https://cdn.discordapp.com/attachments/356544587504025610/357357105667244053/iramalfunctionf.png") Ecolor = "RED"
  if(color != undefined || color === "default") {
    Ecolor = color
  }

  if(footer != undefined) {

  }
  let result = new Discord.RichEmbed().setTitle("Abby").setColor(Ecolor).setThumbnail(url).setDescription(content)

  if(footer != undefined) {
    result.setFooter(footer)
  }
  return result
}
