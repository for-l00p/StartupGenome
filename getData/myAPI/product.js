var cb = require('./base');
var async = require('async');

var productName;

var getNewsPageCount = function (callback_on_count) {
	cb.productNews(productName, 1, function(error, results) {
		var tempName = productName;
		if (!error) {
			// console.log(results.data.paging.number_of_pages);
			callback_on_count(null, results.data.paging.number_of_pages);
		} else {
			console.log(error);
		}
	});
}

var formNewsCallStack = function (pageCount, callback_on_stack_formed) {
	var callStack = [];

	var iters = Array.apply(null, {
		length: pageCount
	}).map(Number.call, Number);

	iters.forEach(function(pos, index) {

		callStack.push(function(callback_on_newsArray) {
			cb.productNews(productName, pos + 1, function(error, results) {
				// console.log(pos + 1);

				// console.log("inside formNewsCallStack", productName, pos + 1);
				var newsArray = [];
				// console.log(results);
				var rawItems;
				if(results.data.paging.total_items == 1) {
					rawItems = [results.data.item];
				} else {
					rawItems = results.data.items;
				}
				
				rawItems.forEach(function(item, index) {
					// statements
					// console.log(item);
					content = item.properties;

					var newsObj = {
						title: content.title,
						date: content.posted_on,
					}

					newsArray.push(newsObj);
				});
				callback_on_newsArray(null, newsArray);
			});
		});

	});

	callback_on_stack_formed(null, callStack);
}

var formFullNewsArray = function (callStack, callback_on_arrayformed) {
	var fullArray = [];

	async.parallel(callStack, function(err, newsArrays) {

		// console.log(newsArrays.length);
		newsArrays.forEach(function(array, index) {
			fullArray = fullArray.concat(array);
			// console.log(fullArray.length);
		});

		callback_on_arrayformed(null, fullArray);
	})

}

function getAllProductNews(product, callback) {
	//set global prodcutName
	productName = product;

	async.waterfall([getNewsPageCount, formNewsCallStack, formFullNewsArray], function(err, newsList) {
		var obj = {
			name : productName,
			count : newsList.length,
			items : newsList
		};
		// console.log("object:",obj);
		callback(obj);
	});

}

module.exports = {
	getAllProductNews: function(product, callback) {
		return getAllProductNews(product, callback);
	}
}