# Io (formerly IRA, Toaster)
A discord bot made for the art heaven server
## Making simple commands easily

~~### Updating index.js and command layout~~

~~First, make sure to have your command added in the index.js in the folder you wish to have the command, (See shitpost index.js for a good example)~~  
This process is now automated. Note that the filenames of commands must be in all lowercase due to input parsing.

Second, make the new command file as whatever you refered to it in index.js, and use this layout
```
const Discord = require("discord.js")
var utils = require("../utils/index.js")
module.exports = {
  name:"!command",
  desc:"Command Description",
  func:function(message){
    message.channel.send({embed:utils.("expression", "Example text", "Custom color (not required), "Footer"")})
  }
}
```

Different expressions (First argument) are happy, sad, angry, malfunction

To use footer without the custom color, just put undefined in custom color (Not a string)
## Setting up
To run the bot on your own build to test stuff or just mess around, follow these instructions
### Installing Prerequisites
First make sure to install nodejs, (newest version, around 8.0)
Packages require that node-gyp is functional on your machine. On windows, that means you will need to run `npm install --global --production windows-build-tools`
Install required dependencies via npm and the package.json by executing this in the directory
```
npm install
```

### Set up cfg.json
Duplicate example-cfg.json

Replace all channel ids with ones appropriate to your server

Replace the role id with an id for a mod role (You must have this to use mod commands)

Replace ytkey with a youtube api key

(ratelimit is in milliseconds)



## Credits
Io character by Jwapple

Abby character made by [Doshmobile](http://doshmobile.tumblr.com/)

Created by Reaxt
Supported by Jwapple
Special thanks to Urotsuki
