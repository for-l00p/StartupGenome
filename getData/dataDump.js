var jsonfile = require('jsonfile');
com = require('./myAPI/companyAndNews');

var arr = process.argv[2].split(",");
companyName = arr[0].substring(15, arr[0].length - 1);
console.log(companyName);

com.getCompany(companyName, function(companyObj) {
	var companyBasic = companyObj.basic;
	var associateProductNews = companyObj.productsNewsList;

	var file = './exports/companies/' + companyName + '.json';
	jsonfile.writeFile(file, companyBasic, function(err) {
		if (err) console.error(err);
	});

	if (associateProductNews) {
		associateProductNews.forEach(function(productNews, index) {
			var fileName = './exports/products/' + productNews.name + '.json';
			jsonfile.writeFile(fileName, productNews, function(err) {
				if (err) console.error(err);
			});
		});
	}
})