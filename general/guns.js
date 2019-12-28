var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!guns",
  desc:"Check how many guns you have.",

  func:function(message){

  	let user = message.author;
    if (message.mentions.members.first()) user = message.mentions.members.first() 

    global.usermanager.getUser(message, user).then( function(userDoc) {
      let expr;
    	if (userDoc.gun > 5) 
        expr = "sad"
    	else 
        expr = "happy"

      if (!userDoc.gun)
        message.channel.send({embed: utils.embed("happy", `You don't have any guns. Pick one up from the shop?`)})
      else
        message.channel.send({embed: utils.embed(expr, `You've got \`${userDoc.gun}\` gun${userDoc.gun > 1 ? "s" : ""} + `.`)});
    });
  }
}
