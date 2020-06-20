const Discord = require("discord.js")
module.exports = (expression, content, color, footer) => {
  var url = null
  var Ecolor = "#f759e8"

  switch(expression) {
    case "happy":
      url = "https://cdn.discordapp.com/attachments/604088023478567053/637787209721708554/happy.png"
      break;
    case "sad":
      url = "https://cdn.discordapp.com/attachments/604088023478567053/637787206538494002/sad.png"
      break;
    case "malfunction":
      url = "https://cdn.discordapp.com/attachments/604088023478567053/637787204420108307/malfunction.png"
      Ecolor = "RED";
      break;
    case "angry":
      url = "https://cdn.discordapp.com/attachments/604088023478567053/637787208132198410/angry.png"
      break;
    case "abbyHappy":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414646034628625/abbyhappy.png"
      break;
    case "abbySad":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414649302122506/abbysad.png"
      break;
    case "abbyMalfunction":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414647573938186/abbymalfunction.png"
      Ecolor = "RED";
      break;
    case "abbyAngry":
      url = "https://cdn.discordapp.com/attachments/203334579166117888/528414643962642465/abbyangry.png"
      break;
    default:
      url = null;
      break;
  }
  if(color != undefined || color === "default") {
    Ecolor = color
  }
  let result = new Discord.MessageEmbed().setTitle("Io").setColor(Ecolor).setThumbnail(url).setDescription(content)

  if(footer != undefined) {
    result.setFooter(footer)
  }
  return result
}
