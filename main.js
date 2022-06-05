const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require('fs');
const fsPromises = fs.promises
const eventEmitter = require('events');
const { version } = require('./package.json');
// CONFIG DETERMINATION (reads different files with 'live' or 'dev' command line param)
var config;
if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case ("live"): {config = JSON.parse(fs.readFileSync("./cfg_live.json")); break};
    case ("dev"): {config = JSON.parse(fs.readFileSync("./cfg_dev.json")); break};
    default: config = JSON.parse(fs.readFileSync("./cfg.json"));
  } 
} else config = JSON.parse(fs.readFileSync("./cfg.json"));

// Extra config stuff that I want synced across git

//IRA HANDLER
const ira = new eventEmitter()
//local VARIABLES
var limitusers = []
var defaultGuild
var logChannel
//GLOBAL VARIABLES
global.queue = []
global.votes = 0
global.voteusers = []
global.pollobject = JSON.parse(fs.readFileSync("./poll.json"))
global.streamoptions = {volume:0.5, bitrate:192000}
global.defaultVolume = 0.5
global.blacklist = [];
global.config = config;
global.config.version = version;
global.client = client;
global.usermanager = require("./events/usermanager.js")
global.cardmanager = require("./events/cardmanager.js")
global.dropmanager = require("./events/dropmanager.js")
global.defautlGuild;
global.logChannel;
//modules
var general = require("./general/index.js")
var utils = require("./utils/index.js")
var shitpost = require("./shitpost/index.js")
var mod = require("./mod/index.js")
var music = require("./music/index.js")
var dj = require("./dj/index.js")
var botmanage = require("./botmanage/index.js")
var logs = require("./events/logs/index.js")
var poll = require("./events/poll.js")
//RELOAD FUNC
function shutdown(message) {
  message.channel.send({embed:utils.embed("happy", "Good night!")}).then( function() {
    fs.writeFileSync("./shutdownstatus.json", `{"shutdown":true}`)
    client.destroy()
    process.exit()
  });
}
function reload(arg, message) {
  try {
    if(config.owners.includes(message.author.id)) {
      arg = message.content.split(" ")[1]
      switch (arg) {
        case "general":
          general.refresh()
          delete require.cache[require.resolve('./general/index.js')];
          general = require('./general/index.js'); 
          delete require.cache[require.resolve('./events/usermanager.js')]
          global.usermanager = require("./events/usermanager.js")
          delete require.cache[require.resolve('./events/cardmanager.js')]
          global.cardmanager = require("./events/cardmanager.js")
          delete require.cache[require.resolve('./events/dropmanager.js')]
          global.dropmanager = require("./events/dropmanager.js")
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "shitpost":
          shitpost.refresh()
          delete require.cache[require.resolve('./shitpost/index.js')]
          shitpost = require('./shitpost/index.js')
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "mod":
          mod.refresh()
          delete require.cache[require.resolve('./mod/index.js')]
          mod = require('./mod/index.js')
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "botmanage":
          botmanage.refresh()
          delete require.cache[require.resolve('./botmanage/index.js')]
          botmanage = require('./botmanage/index.js')
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "dj":
          botmanage.refresh()
          delete require.cache[require.resolve('./dj/index.js')]
          mod = require('./dj/index.js')
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "music":
          music.refresh(message)
          delete require.cache[require.resolve('./music/index.js')]
          music = require('./music/index.js')
          embed = utils.embed("happy", `Reloaded module ${arg}`)
          message.channel.send({embed})
          break;
        case "logs":
          logs.refresh()
          delete require.cache[require.resolve('./events/logs/index.js')]
          logs = require('./events/logs/index.js')
          message.channel.send({embed:utils.embed("happy", `Reloaded module ${arg}`)})
          break;
        case "poll":
          delete require.cache[require.resolve('./events/logs/index.js')]
          poll = null
          poll = require('./events/poll.js')
          break;
        case "utils":
          utils.refresh()
          delete require.cache[require.resolve('./utils/index.js')]
          utils = require('./utils/index.js')
          message.channel.send({embed:utils.embed("happy", `Reloaded module ${arg}`)})
          break;
        default:
            message.channel.send({embed:utils.embed("malfunction", "`Invalid Option`")})
          }

      }
     else {message.channel.send({embed:utils.embed("malfunction", "`You dont have permission for this command`")})}
  } catch (err) {
    message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
  }
}
//EVAL FUNC
function evalcmd(message) {
  let content = message.content.substr(message.content.split(" ")[0].length + 1)
  let evalresponse
    try {
      evalresponse = eval(content)
    } catch(err) {
      return message.channel.send("An Error Occured with the input " + content + "\n ```" + err.stack + "```")
    } 
    if(evalresponse === undefined) {return message.channel.send("```undefined```")} 
    else if (evalresponse === null) {message.channel.send("```null```")} 
    else {
      message.channel.send({embed:utils.embed("happy", `Eval response:\`\`\`${evalresponse.toString()}\`\`\``)})
    }
}
//READY EVENT
client.on("ready", async function() {
  defaultGuild = await client.guilds.resolve(config.guildid)
  global.defaultGuild = defaultGuild
  logChannel = undefined
  if (defaultGuild) {
    logChannel = defaultGuild.channels.resolve(config.logs)
    global.logChannel = logChannel
    if (!logChannel) {
      console.log("log channel missing")
    }
  } else {
    console.log("default guild missing")
  }

  let shutdownstatus = await fsPromises.readFile("./shutdownstatus.json");
  if (JSON.parse(shutdownstatus).shutdown == false) {
    if (logChannel) {
      logChannel.send(null,{embed:utils.embed("malfunction", "OKAY I DON'T THINK I SHUT DOWN PROPERLY THERE", undefined, `Version ${version}`)})
    }
    
  } else {
    logChannel.send(null,{embed:utils.embed("happy", `HEY IDIOTS I'M RUNNIN' ON VERSION ${version} TODAY`)})
  }
  fsPromises.writeFile("./shutdownstatus.json", `{"shutdown":false}`, (err) => {})

  global.pollobject = JSON.parse(fs.readFileSync("./poll.json"))
  global.dropmanager.catchUp();

  if (defaultGuild) {
    if (global.pollobject.pollmessage != null) {
      pollChan = await defaultGuild.channels.resolve(global.pollobject["pollchan"])
      pollChan.messages.resolve(global.pollobject.pollmessage)
    }
    if (defaultGuild.me.voice.channel) {
      defaultGuild.me.voice.kick("Cleaning up crashed voice connection")
    }
  }

})
// COMMAND HANDLING PT 1
// lookupCommand(message, command): searches command lists and returns the corresponding function if it exists. 
function lookupCommand(message, command) {
      if(general.commandList.includes(command)) {
        return general[command].func
      }
      else if(shitpost.commandList.includes(command)) {
        return shitpost[command].func
      }
      else if(music.commandList.includes(command)) {
        if (!message.guild) return;
        return music[command].func
      }
      else if (dj.commandList.includes(command)) { // these commands must check for permissions. currently these are hard-coded and do not respond to the perms specified within the module index.js
        if (!message.guild) return;
        if (message.member.roles.cache.has(config.djrole) || message.member.roles.cache.has(config.modrole) || config.owners.includes(message.author.id))
          return dj[command].func;
        else return;
      }
      else if(mod.commandList.includes(command)) {
        if (!message.guild) return;
        if(config.owners.includes(message.author.id) || message.member.roles.cache.has(config.modrole)) {
          return mod[command].func;
        } else return;

      }
      else if(botmanage.commandList.includes(command)) {
        if (!message.guild && !config.owners.includes(message.author.id)) return;
        if(config.owners.includes(message.author.id) || message.member.roles.cache.has(config.modrole) ) {
          return botmanage[command].func;
        } else return;
      }
      return;
}

//COMMAND HANDLER
client.on("message", message => {

  try {

    if(client.user.id == message.author.id) return

    // if bot is mentioned, forward it to owner
    if(message.mentions.has(client.user, options={"ignoreRoles":true, "ignoreEveryone":true})) {
      utils.messageOwner.func("I've been messaged: "+message.url);
    }

    // basic input parsing
    if(!message.content.startsWith(config.prefix)) return
    if(message.content == config.prefix) return
    if(global.blacklist.includes(message.author.id)) return
    let command = message.content.split(config.prefix)[1]
          .split(" ")[0]
          .replace(" ", "")
          .toLowerCase();
    if(!command) return;
    if(command === "reload") return reload(message.content.split(" ")[1], message)
    if(command === "eval" && config.owners.includes(message.author.id)) return evalcmd(message)
    if(command === "shutdown" && config.owners.includes(message.author.id)) return shutdown(message)
    
    var func = lookupCommand(message, command); 
    if (func) {
      if(limitusers.includes(message.author.id)) return message.channel.send({embed:utils.embed("angry", `SLOW DOWN I'M GONNA TRIP A BREAKER!`)}).then((message) => {
        setTimeout(function() {
          message.delete()
        }, config.ratelimitmessage)
      })
      try {
        func.call(client, message)
        ira.emit("ratelimit", message.author)
      }catch(err) {
        var embed = utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")
        message.channel.send({embed})
      }
    }
  } catch (err) { // Catch an error not in a promise
    utils.messageOwner.func({embed:utils.embed(
      `malfunction`, 
      `Unhandled error due to \`${message.content}\`! \`\`\`${err}\`\`\` ${message.url}`, 
      "RED", 
    )});
  }
})

client.on('error', (error) => {
		console.log("Unhandled Error!")
		console.log(error.error)
})
//BOT HANDLER EVENTS
ira.on("ratelimit", (user) => {
  // limitusers.push(user.id)
  // setTimeout(function() {
  //   limitusers.splice(limitusers.indexOf(user.id))
  // }, config.ratelimit)
})
//events and things
//Poll events



//I DONT FUCKING KNOW WHY IT WORKS LIKE THIS BUT NOT MODULAR I WAS SLEEP DEPRIVED WHEN I WROTE IT AND IT ONLY SEEMS TO WORK IN THESE EXACT CONDITIONS PLEASE HELP
//This is the only bit of code ive written that confuses me just cause it only works here but no where else even though there are no specific dependecies to the client and passing a user object should let me get the client object i honestly have no idea why it only works in this context it should work in modular form but guess what it doesnt even though it should i dont understand it SEND HELP

client.on("messageReactionAdd", (reaction, user) =>{
  global.pollobject = JSON.parse(fs.readFileSync("./poll.json"))
  if(user == client.user) return
  if(global.pollobject.pollmessage == null) return
  if(reaction.message.id === global.pollobject.pollmessage) {
    reaction.message.reactions.forEach(function(r) {
      r.fetchUsers().then(users => {
        if(reaction.emoji.name === r.emoji.name) return
        if(users.has(user.id)) {
          r.users.remove(user)
        }
      })
    })
  }
})
client.on("messageReactionAdd", (reaction, user) => {
  if(user == client.user) return
  global.dropmanager.getDrop(reaction.message).then(doc => {
    if (reaction.emoji.name == doc.reaction) {
      if (doc.endTime < new Date().getTime()) {
        global.dropmanager.endDrop(doc)
      } else {
        global.dropmanager.claim(undefined, user, doc)
      }
    }
  }).catch(err => {})
})

//LOGS OVER HERE
//log error function
function logerr(err) {
  logChannel.send({embed:utils.embed("malfunction", `OH BOY ERROR IN MY LOGS \`\`\`${err}\`\`\``)})
}
//Log events
client.on("messageDelete", (message) => {
  try {logs.mdelete(message)}catch(err){logerr(err)}
})
client.on("guildMemberRemove", member => {
  try {logs.leave(member)}catch(err){logerr(err)}
})
client.on("guildBanAdd", (guild, user) => {
  try {logs.ban(user)}catch(err){logerr(err)}
})
client.on("guildBanRemove", (guild, user) => {
  try{logs.unbanned(user)}catch(err){logerr(err)}
})
client.on("messageUpdate", (OldMessage, NewMessage) => {
  try{logs.edit(OldMessage, NewMessage)}catch(err){logerr(err)}
})
client.login(config.token)
