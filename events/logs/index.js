var mdelete = require("./delete.js")
var leave = require("./leave.js")
var banned = require("./ban.js")
var unbanned = require("./unban.js")
var edit = require("./edit.js")
var error = require("./error.js")
module.exports.refresh = () => {
    delete require.cache[require.resolve('./delete.js')]
    delete require.cache[require.resolve('./leave.js')]
    delete require.cache[require.resolve('./ban.js')]
    delete require.cache[require.resolve('./unban.js')]
    delete require.cache[require.resolve('./edit.js')]
    delete require.cache[require.resolve('./error.js')]
    edit = require("./edit.js")
    unbanned = require("./unban.js")
    banned = require("./ban.js")
    leave = require("./leave.js")
    mdelete = require("./delete.js")
    error = require("./error.js")
}
module.exports.mdelete = mdelete
module.exports.leave = leave
module.exports.ban = banned
module.exports.unbanned = unbanned
module.exports.edit = edit
module.exports.error = error