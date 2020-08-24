const Discord = require("discord.js");
const utils = require("../utils/index.js");
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const music = require("./index.js");
const request = require("request")
const got = require("got");
const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()
var config = JSON.parse(require("fs").readFileSync("./cfg.json"));

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
  func:async function(message){
    //if not in voiceChannel


    // check that this is a valid query, and decide what we'll do with it
    // Retrieve URL: get attachment URL if exists
    var target; // target URL
    var type;
    if (message.attachments.first() && message.attachments.first().url){
      var target = message.attachments.first().url
      type = "direct"
    } else {
      if (message.content.length > 5) {
        target = message.content.substr(5)
      	type = utils.getaudiotype(target)
      } else {
	      return message.channel.send({embed:utils.embed("happy", "What do you want me to play? I can do YouTube searches and play direct links!")})
      }
    }

    // initiate the connection
    if(!message.member.voice.channel) return message.channel.send({embed:utils.embed("sad", "Youre not in a voice channel")})
    if(!message.guild.me.voice.channel) {
      try {
        await music.summon.func.call(this, message);
      }catch(err) {
        var embed = utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")
        message.channel.send({embed})
      }
    }
    else if(message.member.voice.channel =! message.guild.me.voice.channel) return message.channel.send({embed:utils.embed("sad", "Youre not in the same voice channel as me")})

    //case 1: use youtube
    if (type === "youtube" || type === "search") {
      ytdl.getBasicInfo(target, (err, info) => {
        if(err) {
          search(message.content.slice(5), searchopts, function(err, results) {
            if(err) return message.channel.send({embed:utils.embed("malfunction",`something went wrong! \`\`\`${err}\`\`\``,"RED")})
            if(results.length === 0) return message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`No results found.\`\`\``)})
            
            results = results.map((r) => {
              r.title = entities.decode(r.title)
              return r;
            })

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
                if(result.length === 10) return message.channel.send({embed:utils.embed("sad", "Don't hog the queue, please!")})
                ytdl.getInfo(results[numreactions.indexOf(r.emoji.name)].id, (err, info) => {
                  if(err){
                    message.channel.send({embed:utils.embed("malfunction", `Something went wrong! \`\`\`${err}\`\`\``)})
                  } else {
                    let time = utils.tomins(info.length_seconds)
                    let seconds = time[1] 
                    if(seconds < 9) seconds = "0" + time[1].toString()
                    global.queue.push({
                        "url":results[numreactions.indexOf(r.emoji.name)].id, 
                        "info":results[numreactions.indexOf(r.emoji.name)].title, 
                        "user":message.author, 
                        "minutes":time[0], 
                        "seconds":seconds, 
                        "startTime":0,
                        "type":"youtube"})
                    message.channel.send({embed:utils.embed("happy", `queued \`${results[numreactions.indexOf(r.emoji.name)].title}\``)})
                    setTimeout(function () {
                      music.play.func(message)
                    }, 500);
                  }
                })
              })
            })
          })
        } else {
          var result = global.queue.filter(function( obj ) {
            return obj.user.id == message.author.id;
          });
          if(result.length === 3) return message.channel.send({embed:utils.embed("sad", "Don't hog the queue, please!")})
          let time = utils.tomins(info.length_seconds)
          let seconds = time[1]
          if(seconds < 10) seconds = "0" + time[1].toString()
          global.queue.push({
              "url":message.content.split(" ")[1], 
              "info":info.title, 
              "user":message.author, 
              "time":info.length_seconds, 
              "minutes":time[0], 
              "seconds":seconds, 
              "startTime":0, 
              "type":"youtube"})
          message.channel.send({embed:utils.embed("happy", `queued \`${info.title}\``)})
          setTimeout(function () {
            music.play.func(message)
          }, 500);
        }
      })
    } // case 2: soundcloud
    else if (type == "soundcloud") {
      request(`http://api.soundcloud.com/resolve?url=${target}&client_id=${config.scid}`, (error, response, body) => {
        if (error) { //request error case
          message.channel.send({embed:utils.embed("malfunction", `It looks like those debt collectors convinced SoundCloud to block me... \`\`\`${error}\`\`\``,"RED")})
        }
        if (!body) {
          return message.channel.send({embed:utils.embed("sad","It looks like those debt collectors convinced SoundCloud to block me...","RED")});
        }
        track = JSON.parse(body);
        if (track.kind === "playlist") return message.channel.send({embed:utils.embed("sad","I can't play playlists right now. Sorry!","RED")});
        var result = global.queue.filter(function( obj ) {
          return obj.user.id == message.author.id;
        });
        if(result.length === 10) return message.channel.send({embed:utils.embed("sad", "Don't hog the queue, please!")})
        //duration conversion (ms to min:sec)
        let length_seconds = Math.floor(track.duration/1000)
        let time = utils.tomins(length_seconds)
        time[1] = (time[1] < 10 ) ? "0" + time[1].toString() : time[1].toString();
        //enqueue
        global.queue.push({
            "url":track.stream_url, 
            "info":track.title, 
            "user":message.author, 
            "time":length_seconds, 
            "minutes":time[0], 
            "seconds":time[1], 
            "startTime":0,
            "permalink_url":track.permalink_url, 
            "type":"soundcloud"}) 
        message.channel.send({embed:utils.embed("happy", `queued \`${track.title}\``)})
        setTimeout(function () {
          music.play.func(message)
        }, 500);
        }
      )}
    //case 3: direct
    else { 
      var prevQueues = global.queue.filter(function( obj ) {
        return obj.user.id == message.author.id;
      });
      if(prevQueues.length === 10) return message.channel.send({embed:utils.embed("sad", "Don't hog the queue, please!")})

      let url = target;

      (async () => {
        try {
          let res = await got(url, {method:"HEAD"});
          let statusCode = res.statusCode;
          let contentType = res.headers['content-type'];
          if (/4\d\d/.test(statusCode) === true) { // checks 4xx status code
            message.channel.send({embed:utils.embed("sad", "Hey, I can't find this thing.. Are you sure that's the right link?","RED")})
            dispatcher.end();
          } else if (!/^video\/*/.test(contentType) && !/^audio\/*/.test(contentType) ) {
            message.channel.send({embed:utils.embed("sad", "I can only play raw video and audio files, sorry!","RED")})
            dispatcher.end();
          } else {
            var info = target.split('/').pop()
            global.queue.push({
                "url":target, 
                "info":info, 
                "user":message.author, 
                "startTime":0,
                "type":"direct"})
            message.channel.send({embed:utils.embed("happy", `queued \`${info}\``)})
            setTimeout(function () {
              music.play.func(message)
            }, 500);
          }
        } catch (error) {
          console.log(error.response.body);
          message.channel.send({embed:utils.embed("sad", "Hey, I can't find this thing.. Are you sure that's the right link?","RED")})
        }
      })();
      
    }
    
  }
}
