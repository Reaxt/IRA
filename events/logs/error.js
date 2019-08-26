const utils = require("../../utils/index.js")
module.exports = (err) => {
    let embed = message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
    global.client.guilds.get(global.config.guildid).channels.get(global.config.logs).send({embed})
}