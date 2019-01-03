const Discord = require("discord.js")
var utils = require("../utils/index.js")
const request = require("request")
module.exports = {
  name:"!cat",
  desc:"these guys are dangerous don't trust them",
  shitpost:true,
  func:function(message){
    request('http://shibe.online/api/cats?count=1&urls=true', (error, response, body) => {
    	  if (error) { //request error case
          	message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${error}\`\`\``,"RED")})
        }
        try {
        	 message.channel.send(new Discord.RichEmbed().setImage(JSON.parse(body)[0]));
        } catch (err) {
        	 message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
        }
    })
  }
}