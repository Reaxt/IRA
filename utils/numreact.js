var numreactions = ["1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟" ]
function numreact (message1, i, pollamount) {
  if (i >= pollamount) return;

  setTimeout(function () {
    if (message1 && !message1.deleted) {
      message1.react(numreactions[i]).then(numreact(message1, ++i, pollamount)).catch((err) => {})
    }
  }, 500);

}
module.exports = numreact
