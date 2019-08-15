function voicekick(message, targetMember) {
  message.channel.guild.createChannel("THE NETHER", "voice", null, "test").then(channel => {
    targetMember.setVoiceChannel(channel).then( () => {
      channel.delete()
    })
  })
}

module.exports = {
  name:"!gun",
  desc:"Just mention a target. Subject to certain rules when in voice chat.",
  func:function(message){

    global.usermanager.getUser(message, message.author).then(userDoc => {
      // check if you have a gun to use
      if (!userDoc.gun || userDoc.gun < 1) return message.channel.send("*You don't have a gun. Maybe you could find one in the shop..*")


      let mention = message.content.split(" ")[1]
      if (mention && mention.startsWith("<@") && mention.endsWith(">")) {

        let targetMember = message.mentions.members.first()


        // Bot users cannot be shot or kicked.
        if (targetMember.user.bot) {
          if (targetMember.id == client.user.id)
            message.channel.send(`*My impeccable steel sides effortlessly deflect the bullet.*`)
          else 
            message.channel.send(`*Unfortunately, your bullet is no match for **${targetMember.user.username}**'s defenses.*`)
          global.usermanager.updateUser(message, message.author, {$inc: {gun:-1}})

        // Targeting Abby emits a special response.
        } else if (targetMember.id == global.config.abbyId) {
          message.channel.send("*The moment you fire, you are sprawled on the floor with a bullet in your back.*")
          if (message.member.voiceChannel) {
            voicekick(message, message.member)
          }
          global.usermanager.updateUser(message, message.author, {$inc: {gun:-1}})

        // Targeting yourself emits a special response.
        } else if (targetMember.id == message.author.id) {
          message.channel.send(`*You mercilessly gun down... yourself.. until the magazine is empty. Now where did that get you?*`)
          global.usermanager.updateUser(message, message.author, {$inc: {gun:-1}})
          if (targetMember.voiceChannel) {
            voicekick(message, targetMember)
          }

        // target exists within voice channel
        } else if (targetMember.voiceChannel) {
              // in same VC: act normally
              if (targetMember.voiceChannel && targetMember.voiceChannel == message.member.voiceChannel) {
                message.channel.send(`*You mercilessly gun down <@!${targetMember.id}> until the magazine is empty.*`)
                voicekick(message, targetMember)
                global.usermanager.updateUser(message, message.author, {$inc: {gun:-1}})
              } else { // the instigator isn't in the same VC
                message.channel.send(`*From this distance, you can't get a clear shot on **${targetMember.displayName}**.*`)
              }          

        // target is not in a voice channel
        } else {
          message.channel.send(`*You mercilessly gun down <@!${targetMember.id}> until the magazine is empty.*`)
        }

      // You didn't specify a target.
      } else {
        message.channel.send("*Carelessly, you fumble the gun and it discharges into the floor. Next time, try focusing on a target?*")

        global.usermanager.updateUser(message, message.author, {$inc: {gun:-1}})

      }
    })
  }
}