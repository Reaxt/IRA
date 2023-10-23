const Discord = require("discord.js")
var utils = require("../utils/index.js")
const request = require("request")
module.exports = {
  name:"!bird",
  desc:"a nice bird for your eye-holes",
  shitpost:true,
  func:function(message){
    request('http://shibe.online/api/birds?count=1&urls=true', (error, response, body) => {
    	  if (error) { //request error case
          	message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${error}\`\`\``,"Red")]})
        }
        try {
        	 message.channel.send(new Discord.MessageEmbed().setImage(JSON.parse(body)[0]));
        } catch (err) {
        	 message.channel.send({embeds:[utils.embed("malfunction", `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``,"Red")]})
        }
    })
  }
}