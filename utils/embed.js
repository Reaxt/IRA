const Discord = require("discord.js")
module.exports = (expression, content, color, footer) => {
  var url = null
  var Ecolor = "#dfb413"

  switch(expression) {
    case "happy":
      url = "https://cdn.discordapp.com/attachments/512493868839731201/905100842460401724/sandalidle2x.gif"
      break;
    case "sad":
      url = "https://cdn.discordapp.com/attachments/512493868839731201/905111817586614292/sandalwhat2x.gif"
      break;
    case "malfunction":
      url = "https://cdn.discordapp.com/attachments/512493868839731201/905107401261322290/sandalerror2x.gif"
      Ecolor = "#0827F5"; // Same blue screen as she gets
      break;
    case "angry":
      url = "https://cdn.discordapp.com/attachments/512493868839731201/905113756495908914/sandaldoxx2x.gif"
      break;
    case "track_played":
      url = "https://cdn.discordapp.com/attachments/512493868839731201/905104449633132554/sandalnowplaying2x.gif"
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
