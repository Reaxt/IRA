const Discord = require("discord.js")
const utils = require("../utils/index.js")
const cardManager = require("./cardmanager.js")
const logs = require("./logs/index.js")
const NeDB = require("nedb")

// DROPMANAGER.JS
// manages updates to card data (userdata.db) via a NeDB database
// i want this to just input and output data and numbers, with other methods handling discord outputs, but the nature of callbacks makes that difficult

const defaultReaction = "💠"

/** STRUCTURE OF A CARD DROP DOCUMENT
 * {
 *  channelId:
 *  messageId:
 *  endTime: Date
 *  reaction: String(char emoji preferred)
 *  cardName:
 *  genuine:
 *  claimedUsers: [ array ]
 * }
**/

var db = new NeDB({filename: './drops.db'})
db.loadDatabase(function (err) {
	if (err) {
		console.log("Failed to load card drops! Err: " + err);
	}
});
db.ensureIndex({fieldName:'messageId'}, (err) => {

})

function catchUp() {

    db.find({}, (err, docs) =>  {
        for (let docKey in docs) {
            let doc = docs[docKey]

            function checkIfEnded() {
                setTimeout( () => {
                    if (new Date().getTime() > doc.endTime) {
                        endDrop(doc)
                    }
                }, 1000)
            }
            console.log(`Catching up for drop ${doc.cardName}`)

            async function dropCatchUp() {
                let msgChannel = await global.client.channels.resolve(doc.channelId)
                if (!msgChannel) {
                    logs.error(`Failed to find drop event ${doc.channelId}/${doc.messageId} for card ${doc.cardName}! \nFull error:\n${err}`)
                    checkIfEnded();
                }
                let msg = await msgChannel.messages.resolve(doc.messageId)
                if (!msg) {
                    logs.error(`Failed to find drop event ${doc.channelId}/${doc.messageId} for card ${doc.cardName}! \nFull error:\n${err}`)
                    checkIfEnded();
                }
                let reaction = msg?.reactions?.cache?.get(doc.reaction)
                if (reaction) {
                    reaction.users.fetch().then(users => {
                        
                        users.delete(global.client.user.id)
                        users.sweep(user => doc.claimedUsers.includes(user.id))
                        users.forEach((user, userId)=> {
                            claim(undefined, user, doc).catch(err => console.log(`Error claiming ${doc.cardName} for ${userId}: \n${err}`))
                        })
                        checkIfEnded();
                    })
                } else {
                    console.log(`Failed to catch-up claims on card drop ${doc.channelId}/${doc.messageId}!`)
                    checkIfEnded();
                }

            }
            dropCatchUp();
        }
    })
}


/**
 * 
 * @param {Message} invokeMessage 
 * @param {User} user 
 * @param {DropDoc} dropDoc 
 * @returns Promise: true if drop claimed successfully
 */
function claim(invokeMessage, user, dropDoc) {
    return new Promise((resolve, reject) => {
        if (dropDoc.claimedUsers.includes(user.id)) {
            resolve("Already claimed")
        } else {
            db.update({messageId:dropDoc.messageId}, {$addToSet: {claimedUsers:user.id}}, {}, (err, numUpdated) => {
                if (err) reject(err)
                else if (numUpdated == 0) reject("Couldn't add to set")
                else {
                    console.log(`User ${user.id} claimed ${dropDoc.cardName}`)
                    global.cardmanager.createCardFromName(invokeMessage, user, dropDoc.cardName).then(doc => {
                        if (dropDoc.genuine) {
                            doc.genuine = true;
                        }
                        global.cardmanager.updateCard(doc).then(updated => resolve("Success")).catch(err => reject(err));
                    }).catch(err => reject(err))
                }
            });
        }
    })
}

function createDrop(invokeMessage, targetMessage, endTime, reaction, cardName, genuine) {
    doc = {
        channelId:targetMessage.channel.id,
        messageId:targetMessage.id,
        endTime:endTime,
        reaction:reaction,
        cardName:cardName,
        genuine:genuine,
        claimedUsers:[]
    }
    db.insert(doc)
}
function endDrop(doc) {
    console.log("Ending drop for " +doc.cardName)
    db.remove({_id:doc._id}, {}, (err, n) => {
        if (err) console.log(err)
    })
}
function endDropByMessage(invokeMessage, targetMessage) {

}

function getDrop(message) {
    return new Promise((resolve, reject) => {
        db.findOne({messageId:message.id}, (err, doc) => {
            if (err) reject(err)
            else if (!doc) reject("nodoc")
            else resolve(doc)
        });
    })
}

module.exports = {
    db:db,
    getDrop:getDrop,
    createDrop:createDrop,
    endDrop:endDrop,
    claim:claim,
    catchUp:catchUp
}