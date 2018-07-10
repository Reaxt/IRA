var utils = require("../utils/index.js")
const Discord = require("discord.js")
const music = require("../music/index.js")

module.exports = {
  name:"!blacklist",
  desc:"adds a user to the blacklist",
  mod:true,
  music:true,
  func:function(message){
 	if(message.mentions.users.first()) {
	console.log(message.mentions.users.first())
	if(global.blacklist.includes(message.mentions.users.first().id)) {
	global.blacklist.splice(global.blacklist.indexOf(message.mentions.users.first().id), 1)
	message.channel.send(`unblacklisted user <@${message.mentions.users.first().id}>`)
} else {
	global.blacklist.push(message.mentions.users.first().id)
	message.channel.send(`blacklisted user <@${message.mentions.users.first().id}>`)
}
}

  }
}
