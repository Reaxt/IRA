const NeDB = require('nedb')
// a single run script which resets every user's ether
var db = new NeDB({filename: './carddata.db'})
var archdb = new NeDB({filename: './carddata_archive.db'})
db.loadDatabase(function (err) {
	if (err) {
		console.log("Failed to load carddata! Err: " + err);
	}
});
archdb.loadDatabase(function (err) {
    if (err) {
		console.log("Failed to load archdata! Err: " + err);
	}
});

db.find({}, (err, docs) => {
    let count = 0
    for (let docKey in docs) {
        let doc = docs[docKey]
        if (doc.name === "eCrash") {
            count++
            archdb.insert(doc, function(err) {if (err) console.log(err)})
            db.remove({_id:doc._id});
        }
    }
    console.log(`parsed ${docs.length} cards and removed ${count} cards`)
    console.log("complete")
})