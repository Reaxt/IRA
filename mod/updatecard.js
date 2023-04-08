const Discord = require("discord.js")
const utils = require("../utils/index.js")
const NeDB = require('nedb')
const fs = require("fs");

const cards = JSON.parse(fs.readFileSync("./events/cards.json"))
const ITEMS_PER_PAGE = 10

module.exports = {
  name: "!updateCard",
  desc: "Updates a specific card in everyone's inventories in relation to its status in `cards.json`. WHEN EDITING CARDS, DO NOT EDIT THE [name] SECTION.",
  mod: true,
  func: async function (message) {
    const cardPages = Math.ceil(cards.length / ITEMS_PER_PAGE)
    let currentPage = 0

    const embed = await generateCardListEmbed(cards, currentPage, ITEMS_PER_PAGE)
    const sentMsg = await message.channel.send(embed)

    var db = new NeDB({filename: './carddata.db'})
    if (cardPages > 1) {
      await sentMsg.react("⬅️")
      await sentMsg.react("➡️")
    }

    const filter = (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name) && user.id === message.author.id
    const collector = sentMsg.createReactionCollector(filter, { time: 60000 })
    collector.on("collect", async (reaction, user) => {
      await reaction.users.remove(user.id)
      switch (reaction.emoji.name) {
        case "⬅️":
          currentPage = currentPage > 0 ? currentPage - 1 : cardPages - 1
          break
        case "➡️":
          currentPage = currentPage < cardPages - 1 ? currentPage + 1 : 0
          break
      }
      const newEmbed = await generateCardListEmbed(cards, currentPage, ITEMS_PER_PAGE)
      await sentMsg.edit(newEmbed)
    })

    const messageFilter = (response) => {
      return !isNaN(response.content) && Number(response.content) > 0 && Number(response.content) <= cards.length
    }

    try {
        const collected = await message.channel.awaitMessages(messageFilter, { max: 1, time: 60000, errors: ["time"] });
        const selectedCardIndex = Number(collected.first().content) - 1;
        const selectedCard = cards[selectedCardIndex];
        await sentMsg.reactions.removeAll();
        db.loadDatabase(function (err) {
          if (err) {
            console.log("Failed to load carddata! Err: " + err);
          }
        });
        sentMsg.edit({ embed: utils.embed(`happy`, `YOU SELECTED A CARD WITH INDEX \`${selectedCardIndex + 1}\`: \`${selectedCard.displayName}\` - ARE YOU SURE YOU WANT TO UPDATE IT FOR EVERYONE`) });
        // Confirmation step
        await sentMsg.react("✅");
        await sentMsg.react("❌");
        const confirmationFilter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === message.author.id;
        const confirmationCollector = sentMsg.createReactionCollector(confirmationFilter, { max: 1, time: 60000 });
        confirmationCollector.on("collect", async (reaction, user) => {
          await reaction.users.remove(user.id);
          if (reaction.emoji.name === "✅") {
            try {
              // Update all instances of the selected card in the database
              db.update({ name: selectedCard.name }, { $set: { displayName: selectedCard.displayName, image: selectedCard.image, description: selectedCard.description, rarity: selectedCard.rarity } }, { multi: true }, function (err, numReplaced) {
                if (err) {
                  sentMsg.edit({ embed: utils.embed(`malfunction`, `AN ERROR OCCURRED WHILE UPDATING THE CARD: \`\`\`${err}\`\`\``, "RED") })
                } else {
                  sentMsg.edit({ embed: utils.embed(`happy`, `UPDATED \`${numReplaced}\` CARDS WITH THE NEW INFO FOR \`${selectedCard.displayName}\``) })
                  db.persistence.compactDatafile()
                  sentMsg.reactions.removeAll();
                }
              });
            } catch (err) {
              sentMsg.edit({ embed: utils.embed(`malfunction`, `AN ERROR OCCURRED WHILE DELETING THE CARD: \`\`\`${err}\`\`\``, "RED") });
            }
          } else {
            sentMsg.edit({ embed: utils.embed(`sad`, `OK THANKS FOR WASTING MY TIME`) });
          }
        });
      } catch (err) {
        if (err instanceof Discord.Collection) {
          sentMsg.edit({ embed: utils.embed(`angry`, `REQUEST EXPIRED`), content: null });
        } else {
          sentMsg.edit({ embed: utils.embed(`malfunction`, `OH THAT'S NOT GOOD \`\`\`${err}\`\`\``, "RED") });
        }
        await sentMsg.reactions.removeAll();
      }
  }
}

// Makes the list of all cards
async function generateCardListEmbed(cards, currentPage, itemsPerPage) {
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayCards = cards.slice(startIndex, endIndex)

  
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Card List`, "https://cdn.discordapp.com/attachments/512493868839731201/905100842460401724/sandalidle2x.gif")
	.setDescription("`Enter the number of a card to select it.`")
    .setColor("#f759e8")
    .setFooter(`Page ${(startIndex/ITEMS_PER_PAGE)+1}/${Math.ceil((cards.length/ITEMS_PER_PAGE))}`)

  for (let i = 0; i < displayCards.length; i++) {
    const card = displayCards[i]
    embed.addField(`[${startIndex + i + 1}] ${card.displayName}`, `name: \`${card.name}\``)
  }

  return embed
}