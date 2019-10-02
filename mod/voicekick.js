module.exports = {
  name:"!voicekick",
  desc:"Kicks a user out of a voice channel",
  mod:true,
  func:function(message){

    let mention = message.content.split(" ")[1]
    if (mention.startsWith("<@") && mention.endsWith(">")) {
      message.channel.guild.createChannel("LOWER THAN DIRT", "voice", null, "test").then(channel => {
        message.mentions.members.first().setVoiceChannel(channel).then( () => {
          channel.delete()
        }).catch(err => {
          channel.delete()
        })
      })

    } else {
      message.channel.send({embed:utils.embed("malfunction", "Please mention a user")})
    }
  }
}
