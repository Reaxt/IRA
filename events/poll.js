const Discord = require("discord.js")
const utils = require("../utils/index.js")
const events = require("events")
const poll = new events();
const fs = require("fs")
//I wrote this while sleep deprived one night and it worked, it confuses me too

poll.on("react", (reaction, user) => {
  let pollobject = JSON.parse(fs.readFileSync("./poll.json"))
  if(user == user.client.user) return
  if(pollobject.pollmessage == null) return console.log(1)
  if(reaction.message.id === pollobject.pollmessage) {
    console.log("aaa")
    reaction.message.reactions.forEach(function(r) {
      console.log("qqaaa")
      r.fetchUsers().then(users => {
        console.log(users)
        if(reaction.emoji.name === r.emoji.name) return console.log("yay")
        if(users.has(user.id)) {
          r.users.remove(user)
          console.log("it had")
        }
      })
    })
  }
})
module.exports = poll
