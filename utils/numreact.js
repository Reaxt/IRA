var numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]
function numreact (message1, i, pollamount) {
  if (i >= pollamount) return;

  setTimeout(function () {

    message1.react(numreactions[i])

    numreact(message1, ++i, pollamount);

  }, 500);
}
module.exports = numreact
