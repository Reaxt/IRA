var paint= require("./paint.js")
var shibe= require("./shibe.js")
var pepsi= require("./pepsi.js")
var pineapple= require("./pineapple.js")
var totinos= require("./totinos.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./paint.js')]
    delete require.cache[require.resolve('./shibe.js')]
    delete require.cache[require.resolve('./pepsi.js')]
    delete require.cache[require.resolve('./pineapple.js')]
    delete require.cache[require.resolve('./totinos.js')]
    totinos = require("./totinos.js")
    paint = require('./paint.js')
    shibe = require("./shibe.js")
    pepsi = require("./pepsi.js")
    pineapple = require("./pineapple.js")
}
module.exports.paint = paint
module.exports.shibe = shibe
module.exports.pepsi = pepsi
module.exports.pineapple = pineapple
module.exports.totinos = totinos
