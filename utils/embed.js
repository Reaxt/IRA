const Discord = require("discord.js")
module.exports = (expression, content, color, footer) => {
  var url = null
  var Ecolor = "#f7ce55"

  switch(expression) {
    case "happy":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357104098443264/irahappyf.png"
      break;
    case "sad":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357110175989760/irasadf.png"
      break;
    case "malfunction":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357105667244053/iramalfunctionf.png"
      break;
    case "pepsi":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357106652774401/irapepsif.png"
      break;
    case "totinos":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357107777110017/iratotinosf.png"
      break;
    case "angry":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357357109018361866/iraangryf.png"
      break;
    case "gun":
      url = "https://cdn.discordapp.com/attachments/356544587504025610/357358740208615424/irapineapple.png"
      break;
    case "pineapple":
     url = "https://cdn.discordapp.com/attachments/356544587504025610/357360525312655360/i_hate_all_of_you.png"
     break;
    case null:
      url = null;
      break;
  }
  if(url === "https://cdn.discordapp.com/attachments/356544587504025610/357357105667244053/iramalfunctionf.png") Ecolor = "RED"
  if(color != undefined || color === "default") {
    Ecolor = color
  }

  if(footer != undefined) {

  }
  let result = new Discord.RichEmbed().setTitle("IRA").setColor(Ecolor).setThumbnail(url).setDescription(content)

  if(footer != undefined) {
    result.setFooter(footer)
  }
  return result
}
