com = require('./myAPI/companyWithNews.js');
var async = require('async');

var fs = require('fs');
var csv = require('csv-parser');
var jsonfile = require('jsonfile');

var stream = fs.createReadStream("sf_companyList.csv");

var nameStack = [];
var callStack = [];

stream.pipe(csv()).on('data', function(data) {
	var name = data.cb_url.substring(14);
	nameStack.push(name);
}).on('end', function() {
	console.log(nameStack.length);
	nameStack.forEach(function(companyName, index) {
		callStack.push(function(callback_on_finish_write) {
			setTimeout(function() {
				com.getCompany(companyName, function(companyObj) {
					var file = './exported/' + companyName + '.json'
					jsonfile.writeFile(file, companyObj, function(err) {
						if (err) console.error(err);
					});
					callback_on_finish_write(null, 'done');
				});
			}, 1000);
		});
	});
	console.log("total companyies: " + callStack.length + "\n");
	async.series(callStack, function(err, result) {
		console.log(1);
	})
});

//"/organization/zonic-digital-inc-","SF Bay Area"