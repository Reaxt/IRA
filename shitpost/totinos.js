const Discord = require("discord.js")
const utils = require("../utils/index.js")

module.exports = {
  name:"!totinos",
  desc:"totinos",
  shitpost:true,
  func:function(message){
    var totinos = [`“Totinos stuffed nachos™ are the best way to get a cheesy fix! In packages of 34, you’ll be never short of a fantastic treat that's sure to keep you making great art and gaming at maximum efficiency!”`, `“Do you know what sonic’s favorite food is? If you guessed chili dogs, you’d surprisingly be wrong. It’s actually a box of satisfying Totinos Pizza Rolls™! They move off the plate as fast as sonic moves through green hill zone for the 15th time! Get your box at http://www.totinos.com/ today!”`, `“Totinos Pizza Rolls™ are the treat loved by *millions. (*Number fabricated and may not be millions) Made using real ingredients including pizza, rolls, tomato sauce, and more! Find them at your local frozen aisle or oven!”`, "http://totinos.com"]
    totinos.push(`“Totinos pizza rolls™ are an official sponsor of Art Heaven, an artists quickest and tastiest snack around! Get a box, or two, or three today!”`)
    totinos.push(`“Check out the new Totinos Party Pizza™, The same taste you all love and know! Now in smaller packaging with more pizza! Visit http://www.totinos.com/en/Party%20Pizza for more!”`)
    totinos.push(`“Totinos Pizza Sticks™ are a great way to make a tasty quick pizza snack! Check them out now at http://www.totinos.com/ !”`)
    var num = Math.floor(Math.random()*totinos.length);
    var embed = utils.embed("totinos", totinos[num])
    message.channel.send({embed})
  }
}
