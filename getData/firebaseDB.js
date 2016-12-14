var fs = require('fs');
var glob = require("glob");
var admin = require("firebase-admin");
var sleep = require('sleep');

// Fetch the service account key JSON file contents
var serviceAccount = require("./startup-genome-6c81e-firebase-adminsdk-snk1u-a8f7d7e6e3.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://startup-genome-6c81e.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

var purge = function() {
	var ref = db.ref();
	ref.set(null, function(err) {
		if (!err) console.log('done purge');
		process.exit(0);
	});
}

var uploadCompanies = function() {
	var ref = db.ref("companies");
	filenames = glob.sync("./exports/companies/*.json");

	var len = filenames.length;
	console.log(len);
	var index = 0;

	while (index < len) {
		var obj = JSON.parse(fs.readFileSync(filenames[index], 'utf8'));
		var ref = db.ref("companies");
		ref.child(obj.perma).set(obj);
		index++;
		console.log(index, obj.perma);
		// sleep.usleep(100000);
	}
}


var uploadProducts = function() {
	var ref = db.ref("companies");
	filenames = glob.sync("/Users/jianruan/Desktop/test1/*.json");

	var len = filenames.length;
	var index = 0;
	while (index < len) {
		var obj = JSON.parse(fs.readFileSync(filenames[index], 'utf8'));
		var ref = db.ref("products");
		ref.child(obj.name).set(obj);
		index++;
		console.log(index);
	}
	
}

// purge();
// uploadCompanies();
uploadProducts();






