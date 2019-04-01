module.exports = {
  name:"!gun",
  desc:"I'm not going to tell you how to use these things.",
  func:function(message){

    global.usermanager.getUser(message, message.author).then(userDoc => {
      if (!userDoc.gun || userDoc.gun < 1) return message.channel.send("*You don't have a gun. Maybe you could find one in the shop..*")

      let mention = message.content.split(" ")[1]
      if (mention.startsWith("<@") && mention.endsWith(">")) {
        let targetUser = message.mentions.members.first()
        message.channel.send(`*You mercilessly gun down <@!${targetUser.id}> until the magazine is empty.*`)

        userDoc.gun--;
        global.usermanager.setUser(message, message.author, userDoc)
        if (targetUser.voiceChannel) {
          message.channel.guild.createChannel("FUCKING DEAD", "voice", null, "test").then(channel => {
            message.mentions.members.first().setVoiceChannel(channel).then( () => {
              channel.delete()
            })
          })
        }
        
      } else {
        message.channel.send("*Carelessly, you fumble the gun and it discharges into the floor. Next time, try focusing on a target?*")
      }
    })
  }
}
