var utils = require("../utils/index.js")
const Discord = require("discord.js")

module.exports = {
  name:"!guns",
  desc:"Check how many guns you have.",

  func:function(message){

  	let user = message.author;
    if (message.mentions.members.first()) user = message.mentions.members.first() 

    global.usermanager.getUser(message, user).then( function(userDoc) {
      message.channel.send({embed: utils.embed("happy", `You've got \`${userDoc.gun}\` guns.`)});
    });
  }
}