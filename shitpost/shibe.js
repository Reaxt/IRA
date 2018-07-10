const Discord = require("discord.js")
var utils = require("../utils/index.js")
const snekfetch = require("snekfetch")
module.exports = {
  name:"!shibe",
  desc:"shibe",
  shitpost:true,
  func:function(message){
    snekfetch.get('http://shibe.online/api/shibes?count=1').then(r => {
      message.channel.send({files:r.body})
    })}}
