var utils = require("../utils/index.js")
const Discord = require("discord.js")

var loanAmount = 500;

var day = 24 * 60 * 60 * 1000;

module.exports = {
  name:"!loan",
  desc:`Take out a loan of ${loanAmount} coins once per day! Don't worry about the debt, you'll figure it out somehow.`,

  func:function(message){

    global.usermanager.getUser(message, message.author).then(userDoc => {
		let now = new Date()
		let timeSinceLastLoan = now - userDoc.lastLoan;
		if (!userDoc.lastLoan || timeSinceLastLoan > 84600000) {
      let rawAmount = loanAmount * Math.min(timeSinceLastLoan/day, 2) // The amount you gain scales over two days
      if (!userDoc.lastLoan) 
        rawAmount = 2*loanAmount;
      else if (rawAmount < loanAmount) {
        rawAmount = loanAmount;
      }
      let amount = Math.floor(rawAmount) 
			userDoc.debt += rawAmount;
			userDoc.coins += amount;
			userDoc.lastLoan = now;

			global.usermanager.setUser(message, message.author, userDoc).then(() => {
				message.channel.send({embed:utils.embed("happy", `**\`${message.author.username}\`** TOOK OUT A LOAN OF \`${amount}\` ABBYCOIN`)})
			}).catch(err => {
				message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
			})
			
		} else {
			message.channel.send({embed:utils.embed("sad", `**\`${message.author.username}\`**HANG ON YOUR LOAN REGENERATES IN \`${hm(84600000 - timeSinceLastLoan)}\` HOURS`)})
		}
    })
  }
}





// Conversion from millliseconds to days hours minutes
// function dhm(t){
//     var cd = 24 * 60 * 60 * 1000,
//         ch = 60 * 60 * 1000,
//         d = Math.floor(t / cd),
//         h = Math.floor( (t - d * cd) / ch),
//         m = Math.round( (t - d * cd - h * ch) / 60000),
//         pad = function(n){ return n < 10 ? '0' + n : n; };
//   if( m === 60 ){
//     h++;
//     m = 0;
//   }
//   if( h === 24 ){
//     d++;
//     h = 0;
//   }
//   return [d, pad(h), pad(m)].join(':');
// }
function hm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  return [pad(h), pad(m)].join(':');
}