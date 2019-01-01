const Discord = require("discord.js")
const utils = require("../utils/index.js")
const events = require("events")
const ytdl = require('../music/lib/index.js');
const request = require('request');
var config = JSON.parse(require("fs").readFileSync("./cfg.json"));

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
    message.channel.send({embed:utils.embed("happy", `Queue's done! I'm outta here.`)})
    message.client.voiceConnections.first().disconnect()
    global.playing = false
    return
  }

  var dispatcher = undefined;
  if (global.queue[0].type == "youtube") {
    let footer = ytID(global.queue[0]["url"])
    if(footer === null) footer = global.queue[0]["url"]
    message.channel.send({embed:utils.embed("happy", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\` with a length of \`${global.queue[0]["minutes"]}:${global.queue[0]["seconds"]}\` `, undefined, `https://youtu.be/${footer}`)})
    dispatcher = message.client.voiceConnections.first().playStream(ytdl(global.queue[0]["url"], {filter: 'audioonly'}), global.streamoptions)
  } 
  else if (global.queue[0].type == "soundcloud") {
    message.channel.send({embed:utils.embed("happy", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\` with a length of \`${global.queue[0]["minutes"]}:${global.queue[0]["seconds"]}\` `, undefined, global.queue[0].permalink_url)})
    dispatcher = message.client.voiceConnections.first().playStream(request(global.queue[0].url+"?client_id="+config.scid, (error, response) => {
      if (error) {
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${error}\`\`\``,"RED")})
        dispatcher.end();
      }
      if (/4\d\d/.test(response.statusCode) === true) { //idk what that regex expression or precicely what response.statusCode are. credit to https://github.com/boblauer/url-exists
        message.channel.send({embed:utils.embed("sad", "Hey, I can't find this thing.. Are you sure that's the right link?","RED")})
        dispatcher.end();
      }
    }), global.streamoptions)
  } 
  else { // A direct link to a audio file. Precursor to SoundCloud functionality.
      let footer = global.queue[0]["url"]
      message.channel.send({embed:utils.embed("happy", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\``, undefined, global.queue[0].url)})
      dispatcher = message.client.voiceConnections.first().playStream(request(global.queue[0].url, (error, response) => {
        if (/4\d\d/.test(response.statusCode) === true) { //idk what that regex expression or precicely what response.statusCode are. credit to https://github.com/boblauer/url-exists
          message.channel.send({embed:utils.embed("sad", "Hey, I can't find this thing.. Are you sure that's the right link?","RED")})
          dispatcher.end();
        }
        if (error) {
          message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${error}\`\`\``,"RED")})
          dispatcher.end();
        }
      }), global.streamoptions)
  }
  global.playing = true
  dispatcher.on("debug", info => {
    console.log(`Debug from stream dispatcher: ${info}`);
  })
  dispatcher.on("end", reason => {
    console.log("neat")
    global.queue.shift()

  	setTimeout(function() {
      try{music.emit("play", message)}  catch(err) {
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
      } 
    }, 1000)
    
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
