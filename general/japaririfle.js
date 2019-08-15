var userId = "210958110473322496" // urotsuki
var targetId = "158442085622611968" // ember

function voicekick(message, targetMember) {
  message.channel.guild.createChannel("THE NETHER", "voice", null, "test").then(channel => {
    targetMember.setVoiceChannel(channel).then( () => {
      channel.delete()
    })
  })
}

module.exports = {
  name:"!japariRifle",
  desc:"Just mention a target. Subject to certain rules when in voice chat.",
  hidden:true,
  func:function(message){

    if (message.member.id != userId) return message.channel.send(`This weapon is ID-locked.`)

    let mention = message.content.split(" ")[1]
    if (mention && mention.startsWith("<@") && mention.endsWith(">")) {

      let targetMember = message.mentions.members.first()

      if (targetMember.id == targetId) {
        // backfire chance
        if (Math.random() < 0.25) {
          if (message.member.voiceChannel) {
            voicekick(message, message.member)
          }
          return message.channel.send(`The gun explodes in your hands, knocking you down.`)
        
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
      } else {
        message.channel.send(`This weapon's targeting system is ID-locked.`)
      }

    // You didn't specify a target.
    } else {
      message.channel.send("*Carelessly, you fumble the gun and it discharges into the floor. Next time, try focusing on a target?*")
    }
  }
}