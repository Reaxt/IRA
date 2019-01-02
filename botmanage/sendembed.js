const Discord = require("Discord.js");
const utils = require("../utils/index.js")
module.exports = {
  name:"!sendEmbed",
  desc:"Sends an embed through me. Doesn't work right now.",
  hidden:true,
  func:function(message){
  	var msgParams = message.content.substring(message.content.indexOf(" ")+1);
  	//eval(`message.channel.send({embed:utils.embed(${msgParams}")});`);
  	message.delete();
  }
}
// eheh