module.exports = {
  name:"!voicekick",
  desc:"Kicks a user out of a voice channel",
  mod:true,
  func:function(message){

    let mention = message.content.split(" ")[1]
    if (mention.startsWith("<@") && mention.endsWith(">")) {
      if (message.mentions.members.first().voiceChannel) {
        message.mentions.members.first().setVoiceChannel(null)
      } else {
        message.channel.send({embed:utils.embed("sad", "They're not in a voice channel right now...")})
      }
      

    } else {
      message.channel.send({embed:utils.embed("malfunction", "Uh, who was that? Could you mention them again?")})
    }
  }
}
