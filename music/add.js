const Discord = require("discord.js")
const utils = require("../utils/index.js")
const ytdl = require('ytdl-core');
const search = require('youtube-search')
var config = JSON.parse(require("fs").readFileSync("./cfg.json"))

var numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]

var searchopts = {
  maxResults: 5,
  key: config.ytkey,
  type: 'video'
};
module.exports = {
  name:"!add",
  desc:"adds a song from youtube",
  music:true,
  func:function(message){
    //if not in voiceChannel

    if(!message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Im not in a voice channel, bring me in one with !summon")})
    if(!message.member.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Youre not in a voice channel")})
    if(message.member.voiceChannel =! message.guild.me.voiceChannel) return message.channel.send({embed:utils.embed("sad", "Youre not in the same voice channel as me")})

    ytdl.getInfo(message.content.split(" ")[1], (err, info) => {
      if(err) {
        search(message.content.slice(5), searchopts, function(err, results) {
          if(err) return message.channel.send({embed:utils.embed("malfunction",`something went wrong! \`\`\`${err}\`\`\``,"RED")})
          if(results.length === 0) return message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`No results found.\`\`\``)})
          message.channel.send({embed:utils.embed("happy",results.map(r => `${results.indexOf(r) + 1}  ${r.title}`))}).then(message1 => {
            var i = 0
            utils.numreact(message1, i, 5)
            //2500

            const collector = message1.createReactionCollector(
              (reaction, user) =>  numreactions.includes(reaction.emoji.name) && user.id === message.author.id,  {time:30000}
            )
            collector.on('collect', r => {
              message1.delete()


              var result = global.queue.filter(function( obj ) {
              return obj.user.id == message.author.id;
              });
          if(result.length === 3) return message.channel.send({embed:utils.embed("sad", "I’m afraid you threw too much… stuff… in the playlist. Please wait until your part of the queue is finished.")})
          ytdl.getInfo(results[numreactions.indexOf(r.emoji.name)].id, (err, info) => {
            if(err){
              message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
            } else {
            let time = utils.tomins(info.length_seconds)
	   let seconds = time[1] 
	   if(seconds < 9) seconds = "0" + time[1].toString()
          global.queue.push({"url":results[numreactions.indexOf(r.emoji.name)].id, "info":results[numreactions.indexOf(r.emoji.name)].title, "user":message.author, "minutes":time[0], "seconds":seconds})
          message.channel.send({embed:utils.embed("happy", `queued \`${results[numreactions.indexOf(r.emoji.name)].title}\``)})
        }
        })
            })
          })
        })
      } else {
            var result = global.queue.filter(function( obj ) {
            return obj.user.id == message.author.id;
            });
        if(result.length === 3) return message.channel.send({embed:utils.embed("sad", "I’m afraid you threw too much… stuff… in the playlist. Please wait until your part of the queue is finished.")})
        let time = utils.tomins(info.length_seconds)
	let seconds = time[1]
        if(seconds < 9) seconds = "0" + time[1].toString()
        global.queue.push({"url":message.content.split(" ")[1], "info":info.title, "user":message.author, "time":info.length_seconds, "minutes":time[0], "seconds":seconds})
        message.channel.send({embed:utils.embed("happy", `queued \`${info.title}\``)})
      }
    })
  }
}
