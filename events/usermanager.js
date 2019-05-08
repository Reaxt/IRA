const Discord = require("discord.js")
const utils = require("../utils/index.js")
const events = require("events")
const NeDB = require("nedb")
const usermanager = new events();
const fs = require("fs")

// USERMANAGER.JS
// manages updates to user data (userdata.db) via a NeDB database
// i want this to just input and output data and numbers, with other methods handling discord outputs, but the nature of callbacks makes that difficult

var db = new NeDB({filename: './userdata.db'})
db.loadDatabase(function (err) {
	if (err) {
		console.log("Failed to load userdata! Err: " + err);
	}
});
db.ensureIndex({ fieldName:'id', unique:true}, function (err) {
	if (err) {
		console.log("Something went wrong indexing the database! " + err);
	}
})

function initUser(user) {
	var doc = {
		id:user.id,
		coins:500,
		debt:0
	};
	//console.log("new user")
	db.insert(doc, function(err, newDoc) {
		doc._id = newDoc._id
	});
	return doc;
}

// usermanager.on("saveRoles", (user) => {
// 	// if (typeof user !== 'GuildMember') return console.log("attempted to save roles of non-guild member")
// 	// //let users = NoSQL.load("./users.nosql")
// 	// userObj = users.meta(user.id)
// 	// if (!userObj) userObj = initUser(user)

// 	// userObj.roles = user.roles
// 	// //users.set(user.id, userObj)
// })

module.exports = {
	events:usermanager,
	database:db,
	//initUser:initUser(user),

	addCoins:function(message, user, amount) {
		db.findOne({id:user.id}, function(err, doc) {
			if (err) console.log("Database update error: " + err);
			//console.log("Fetched a user doc")
			if (!doc) {
				doc = initUser(user);
				db.update({id:user.id}, {$set: {coins: amount}}, {upsert:true}, (err) => {
					if (err) console.log("Database update error");
					//else console.log(`New entry for ${user.name}`)
				})
			} else if (doc.coins) {
				db.update({id:user.id}, {$set: {coins: doc.coins + amount}}, {upsert:true}, (err) => {
					if (err) console.log("Database update error");
					//else console.log(`Added ${amount} coins to user ${user.name}`)
				})
			} else {
				db.update({id:user.id}, {$set: {coins: amount}}, {upsert:true}, (err) => {
					if (err) console.log("Database update error");
					//else console.log(`New entry for ${user.name}`)
				})
			}
		})
	},
	setCoins:function(message, user, amount) {
		db.findOne({id:user.id}, function(err, doc) {
			if (err) console.log("Database update error: " + err);
			if (!doc) {
				doc = initUser(user);
				db.update({id:user.id}, {$set: {coins: amount}}, {upsert:true}, (err) => {
					if (err) console.log("Database update error");
					//else console.log(`New entry for ${user.name}`)
				})
			} else {
				db.update({id:user.id}, {$set: {coins: amount}}, {upsert:true}, (err) => {
					if (err) console.log("Database update error");
					//else console.log(`New entry for ${user.name}`)
				})
			}
		})
	},
	// callback = function(coins)
	fetchCoins:function(message, user, callback) {
		db.findOne({id:user.id}, function(err, doc) {
			if (!doc) {
				doc = initUser(user);
			}
			if (err) message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
			else callback(doc.coins);
		})
	},
	getCoins:function(message, user) {
		return new Promise((resolve, reject) => {
			db.findOne({id:user.id}, (err, doc) => {
				if (!doc) doc = initUser(user);
				resolve(doc.coins);
			})
		})
	},
	// Returns a promise which resolves to a user doc.
	getUser:function(message, user) {
		return new Promise((resolve, reject) => {
			db.findOne({id:user.id}, (err, doc) => {
				if (!doc) {
					doc = initUser(user);
				}
				if (err) message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
				resolve(doc);
			})
		})
	},
	setUser:function(message, user, doc) {
		return new Promise((resolve, reject) => {
			db.update({id:user.id}, doc, (err, newDoc) => {
				if (err) reject(err)
				else resolve(newDoc)
			})
		})
	},
	updateUser:function(message, user, args) {
		return new Promise((resolve, reject) => {
			db.update({id:user.id}, args, (err, doc) => {
				if (err) 
					reject(err)
				else 
					resolve(doc)
			})
		})
	},
	saveRoles:function(message, member) {
		if (!member.roles) return message.channel.send("no roles found")
		db.findOne({id:member.user.id}, function(err, doc) {
			if (!doc) doc = initUser(member.user)

			doc.roles = member.roles.filter(e => e.name != "@everyone").keyArray()
			db.update({id:member.user.id}, {$set:{roles: doc.roles}}, function(err, doc) {
				if (err) message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
			});
		})
	},
	getRoles:function(message, member) {
		return new Promise((resolve, reject) => {
			db.findOne({id:member.user.id}, function(err, doc) {
				if (err) reject(err)
				if (!doc) reject("user absent from database")
				if (!doc.roles) reject("no roles for user")

				resolve(doc.roles);
			})
		})
	},
	// callback: function(message, user, Collection<roles>)
	fetchRoles:function(message, member, callback) {
		db.findOne({id:member.user.id}, function(err, doc) {
			if (!doc) return message.channel.send({embed:utils.embed(`malfunction`,`${member.user.username} isn't in my systems.`, "RED")})
			if (!doc.roles) return message.channel.send({embed:utils.embed(`malfunction`,`I don't have anything on file for ${member.user.username}.`, "RED")})
			callback(message, member, doc.roles);
		})
	},
	// callback = function(message, doc)
	buyItem:function(message, user, price, callback) {
		db.findOne({id:user.id}, function(err, doc) {
			if (!doc) {
				doc = initUser(user);
			}
			if (err) message.channel.send({embed:utils.embed(`malfunction`,`Something went wrong! \`\`\`${err}\`\`\``, "RED")})
			else {
				if (price > doc.coins) {
					message.channel.send({embed:utils.embed('angry', "You don't have the funds for that. Take out a loan?")})
				} else {
					doc.coins -= price
					db.update({id:user.id}, doc)
					callback(message, doc)
				}
			}
		})
	}

	// compoundInterest:function(lastTime) {

	// 	db.find({}, function (err, docs) {
	// 		for (let i = 0; i < docs.length; i++) {
	// 			docs.debt = docs.debt * (1+global.config.loanInterest)
	// 			db.update({id:docs[i]})
	// 		}
	// 	})
	// }
}

db.count({}, (err, count) => { console.log("User Manager initialized. Serving "+ count + " users."); })