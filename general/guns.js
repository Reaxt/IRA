var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!guns",
  desc:"Check how many guns you have.",

  func:function(message){

  	let user = message.author;
    if (message.mentions.members.first()) user = message.mentions.members.first() 

    global.usermanager.getUser(message, user).then( function(userDoc) {
    	if (userDoc.gun > 5) expr = "sad"
    	else expr = "happy"
      	message.channel.send({embed: utils.embed(expr, `You've got \`${userDoc.gun}\` guns.`)});
    });
  }
}