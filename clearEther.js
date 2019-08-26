const NeDB = require('nedb')
// a single run script which resets every user's ether
var db = new NeDB({filename: './userdata.db'})
db.loadDatabase(function (err) {
	if (err) {
		console.log("Failed to load userdata! Err: " + err);
	}
});

db.find({}, (err, docs) => {
    for (let docKey in docs) {
        let doc = docs[docKey]
        if (doc.eventCardCoins) {
            doc.eventCardCoins = 0;
        }
        db.update({_id:doc._id}, doc);
    }
    console.log("parsed " + docs.length + " users")
    console.log("complete")
})