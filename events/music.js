const Discord = require("discord.js")
const utils = require("../utils/index.js")
const events = require("events")
const ytdl = require('ytdl-core');
const request = require('request');
const http = require('http');
var config = JSON.parse(require("fs").readFileSync("./cfg.json"));

var music = new events();
var ytID = require("get-youtube-id")
global.skip = false
global.playing = false
music.on("play", (message) =>{
  global.voteusers = []
  global.votes = 0
  if (!message.guild.voice.connection) {
    return
  }

  // if we've finished the queue, disconnect
  if(global.queue.length === 0) {
    message.channel.send({embed:utils.embed("happy", `Thanks for listening! I'm off.`)})
    message.guild.voice.channel.leave()
    global.playing = false
    global.streamoptions.volume = global.defaultVolume;
    return
  }

  var dispatcher = undefined;
  if (global.queue[0].type == "youtube") {
    let footer = ytID(global.queue[0]["url"])
    if(footer === null) footer = global.queue[0]["url"]
    message.channel.send({embed:utils.embed("track_played", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\` with a length of \`${global.queue[0]["minutes"]}:${global.queue[0]["seconds"]}\` `, undefined, `https://youtu.be/${footer}`)})
    dispatcher = message.guild.voice.connection.play(ytdl(global.queue[0]["url"], {filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25, begin:global.queue[0].startTime}, (error, response) => {
      if (error || !response) {
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${error}\`\`\``,"RED")})
        dispatcher.end();
      } 
    }), global.streamoptions)
  } 
  else if (global.queue[0].type == "soundcloud") {
    message.channel.send({embed:utils.embed("track_played", `Now playing \`${global.queue[0]["info"]}\` queued by \`${global.queue[0]["user"].username}\` with a length of \`${global.queue[0]["minutes"]}:${global.queue[0]["seconds"]}\` `, undefined, global.queue[0].permalink_url)})
    dispatcher = message.guild.voice.connection.play(request(global.queue[0].url+"?client_id="+config.scid, (error, response) => {
      if (error || !response) {
        message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${error}\`\`\``,"RED")})
        dispatcher.end();
      } else if (/4\d\d/.test(response.statusCode) === true) {
        message.channel.send({embed:utils.embed("sad", "Hey, I can't find this thing.. Are you sure that's the right link?","RED")})
        dispatcher.end();
      }
    }), global.streamoptions)
  } 
  else { // A direct link to a audio file. Precursor to SoundCloud functionality.
      message.channel.send({embed:utils.embed("track_played", `Now playing [${global.queue[0]["info"]}](${global.queue[0].url}) queued by \`${global.queue[0]["user"].username}\``, undefined, undefined)})
      directstreamoptions = global.streamoptions;
      directstreamoptions.type = "unknown";

      dispatcher = message.guild.voice.connection.play(global.queue[0].url, directstreamoptions)
  }
  dispatcher.on("start", info => {
    global.playing = true
  })
  dispatcher.on("debug", info => {
    console.log(`Debug from stream dispatcher: ${info}`);
  })
  dispatcher.on("error", info => {
    console.log({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${info}\`\`\``,"RED")});
    global.playing = false
  })
  dispatcher.on("finish", reason => {
    console.log("neat")
    global.queue.shift()

    // play next song
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
  if (message.guild.voice?.connection?.dispatcher){
    message.guild.voice.connection.dispatcher.end()
  } else {
    console.log("not neat")
    global.queue.shift()
    
    try{music.emit("play", message)}  catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
    }
  }
})
music.on("debugFix", (message) => {
  if (message.guild.voice?.connection?.dispatcher) {
    global.queue[0].startTime = message.guild.voice.connection.dispatcher.streamTime
  }
  try{music.emit("play", message)}  catch(err) {
    message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
  }
})
music.on("setVolume", (message) => {
  global.streamoptions.volume = message.content.split(" ")[1]
  if (message.guild.voice.connection?.dispatcher)
    try {
      message.guild.voice.connection.dispatcher.setVolume(message.content.split(" ")[1]);
    } catch (err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
    }
})

module.exports.events = music
module.exports.refresh = (message) => {
  global.queue = []
  global.voteusers = []
  global.votes = []
  global.playing = false
  if(message.guild.voice.connection != undefined) {
    try{music.emit("play", message)}  catch(err) {
      message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``,"RED")})
    }}
  music = null
  music = new events()
}

//global.queue.shift();
