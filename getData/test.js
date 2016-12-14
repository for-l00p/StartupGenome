com = require('./myAPI/companyAndNews');

product = require('./myAPI/product');

companyName = "facebook";

com.getCompany(companyName, function(companyObj) {
	// console.log("done");
	console.log(JSON.stringify(companyObj));
})

// product.getAllProductNews("facebook-messenger-11", function(news) {
// 	console.log(news);
// })