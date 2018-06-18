const Discord = require("discord.js")
const utils = require("../utils/index.js")
const events = require("events")
const ytdl = require('ytdl-core');
var music = new events();
var ytID = require("get-youtube-id")
global.skip = false
global.playing = false
music.on("play", (message) =>{
  global.voteusers = []
  global.votes = 0
  if(message.client.voiceConnections.first().speaking) {
    message.client.voiceConnections.first().dispatcher.end('skip')
    global.queue.shift()
  }

  if(global.queue.length === 0) {
    message.channel.send({embed:utils.embed("happy", `Queue finished, leaving voice.`)})
    message.client.voiceConnections.first().disconnect()
    global.playing = false
  }
    if(global.queue.length === 0) return
    let footer = ytID(global.queue[0]["url"])
    if(footer === null) footer = global.queue[0]["url"]
  
  switch (global.queue[0]["type"]) {
    case "youtube":
      message.channel.send({embed:utils.embed("happy", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\` with a length of \`${global.queue[0]["minutes"]}:${global.queue[0]["seconds"]}\` `, undefined, `https://youtu.be/${footer}`)})
      const dispatcher = message.client.voiceConnections.first().playStream(ytdl(global.queue[0]["url"], {filter: 'audioonly', quality:"lowest"}))
    case "soundcloud":
      
  }
  global.playing = true
  dispatcher.on("end", reason => {
  console.log("neat")
      global.queue.shift()

  	setTimeout(function() {
      try{music.emit("play", message)}  catch(err) {
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
      } }, 1000)
    
  })
})
music.on("end", (message) => {
  global.voteusers = []
  global.votes = 0
  global.queue = []
  try{music.emit("play", message)}  catch(err) {
    message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
  }
})
music.on("skip", (message) => {
    message.client.voiceConnections.first().dispatcher.end()
})
module.exports.events = music
module.exports.refresh = (message) => {
  global.queue = []
  global.voteusers = []
  global.votes = []
  global.playing = false
  if(message.client.voiceConnections.first() != undefined) {
    try{music.emit("play", message)}  catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
    }}
  music = null
  music = new events()
}

//global.queue.shift();
