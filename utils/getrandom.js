
function getrandom (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

module.exports = getrandom
