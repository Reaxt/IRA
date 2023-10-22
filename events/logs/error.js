const utils = require("../../utils/index.js")
module.exports = (err) => {
//    let embed = global.config.logs.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")})
    global.client.guilds.cache.get(global.config.guildid).channels.cache.get(global.config.logs).send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "Red")})
}