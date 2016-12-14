var async = require('async');
company = require('./company');
product = require('./product');

var orgName;
var companyOBJECT = {};

var getBasic = function(callback) {
	company.getCompanyInfo(orgName, function(companyObj) {
		companyOBJECT.basic = companyObj;
		callback(null, companyObj);
	});
}

var productsNews = function(companyObj, callback) {

	// console.log("There are products: " + (companyObj.Products.length != 0) + "\n");

	if (companyObj.Products.length != 0) {
		namelist = companyObj.ProductsPermas;

		var callStack = [];

		namelist.forEach(function(product_perma, index) {
			
			callStack.push(function(callback_on_newsObj) {

				product.getAllProductNews(product_perma, function(newsObj) {
					callback_on_newsObj(null, newsObj);
				})
			});

		});
		
		async.series(callStack, function(err, result) {
			// console.log(result);
			companyOBJECT.productsNewsList = result;
			callback(null, companyOBJECT);
		});

	} else {
		callback(null, companyOBJECT);
	}
}

function getCompany(name, callback_on_complete_CompanyObj) {
	//set global orgName
	orgName = name;
	async.waterfall([getBasic, productsNews], function(err, result) {
		// console.log(JSON.stringify(result));
		if (!err) callback_on_complete_CompanyObj(result);
	});
}

module.exports = {
	getCompany: function(name, callback_on_complete_CompanyObj) {
		return getCompany(name, callback_on_complete_CompanyObj);
	}
}