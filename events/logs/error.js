const utils = require("../../utils/index.js")
module.exports = (err) => {
    let embed = message.channel.send({embed:utils.embed(`malfunction`,`OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED")})
    global.client.guilds.cache.get(global.config.guildid).channels.cache.get(global.config.logs).send({embed})
}