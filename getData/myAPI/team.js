orgInfo = require('./organization');
var async = require('async');

var orgName;

function getPageCoutPerTeam(callback_on_pageNo) {
	var asyncStack = [];

	//build stack
	asyncStack.push(function(callback) {
		orgInfo.orgTeamTotalPageNum(orgName, "current", function(count) {
			callback(null, count);
		});
	});
	asyncStack.push(function(callback) {
		orgInfo.orgTeamTotalPageNum(orgName, "past", function(count) {
			callback(null, count);
		});
	});

	async.parallel(asyncStack, function(err, result) {
		// console.log("current "+result[0]);
		currentPageNo = Math.ceil(result[0] / 100); //100 people per page limit
		// console.log("past "+result[1]);
		pastPageNo = Math.ceil(result[1] / 100);

		callback_on_pageNo(null, currentPageNo, pastPageNo);
	})

}

function getTeamsCallStack(currentPageNo, pastPageNo, callback_on_teamsCallStack) {
	// console.log(currentPageNo);
	// console.log(pastPageNo);

	var currentCallStack = [];
	var pastCallStack = [];

	//each func in callStack is a page result for that team,
	//need to aggreate for each team first
	var crr_index = Array.apply(null, {
		length: currentPageNo
	}).map(Number.call, Number);
	var pst_index = Array.apply(null, {
		length: pastPageNo
	}).map(Number.call, Number);

	//for current team
	crr_index.forEach(function(pos, index) {
		currentCallStack.push(function(callback_on_currentTeamObj) {
			orgInfo.orgCurrentTeam(orgName, pos + 1, function(d) {
				var currentTeamObj = [];
				if (d) {
					totalpages = d.paging.number_of_pages;
					currentPage = d.paging.current_page;

					if (d.paging.total_items == 1) {
						properties = d.item.properties;
						var obj = {
							title: properties.title,
							started: properties.started_on,
							ended: properties.ended_on,
							firstName: null,
							lastName: null
						}
						currentTeamObj.push(obj);
					} else {
						//console.log("current Team: " + currentPage);
						list = d.items;
						list.forEach(function(element, index) {
							properties = element.properties;
							person = element.relationships.person.properties;

							var obj = {
								title: properties.title,
								started: properties.started_on,
								ended: properties.ended_on,
								firstName: person.first_name,
								lastName: person.last_name
							}

							currentTeamObj.push(obj);
						});
						// console.log(currentTeamObj);
					}
					callback_on_currentTeamObj(null, currentTeamObj);
				}
			})
		});

	});


	//for pastTeam
	pst_index.forEach(function(pos, index) {
		pastCallStack.push(function(callback_on_pastTeamObj) {
			orgInfo.orgPastTeam(orgName, pos + 1, function(d) {
				var pastTeamObj = [];
				if (d) {
					totalpages = d.paging.number_of_pages;
					currentPage = d.paging.current_page;
					
					if (d.paging.total_items == 1) {
						properties = d.item.properties;
						var obj = {
							title: properties.title,
							started: properties.started_on,
							ended: properties.ended_on,
							firstName: null,
							lastName: null
						}
						pastTeamObj.push(obj);
					} else {
						//console.log("past Team: " + currentPage);
						list = d.items;
						list.forEach(function(element, index) {
							properties = element.properties;
							person = element.relationships.person.properties;

							var obj = {
								title: properties.title,
								started: properties.started_on,
								ended: properties.ended_on,
								firstName: person.first_name,
								lastName: person.last_name
							}

							pastTeamObj.push(obj);
						});
					}
					// console.log(pastTeamObj);
					callback_on_pastTeamObj(null, pastTeamObj);
				}
			})
		});
	});

	// console.log(currentCallStack);
	// console.log(pastCallStack);
	callback_on_teamsCallStack(null, currentCallStack, pastCallStack);
}


function getTeamArrays(currentCallStack, pastCallStack, callback_on_teamObjs) {

	// console.log(currentCallStack);
	// console.log(pastCallStack);

	var getCurrentTeamArray = function(callback) {
		async.parallel(currentCallStack, function(err, result) {
			var concate = [];
			result.forEach(function(element, index) {
				concate = concate.concat(element);
			});
			callback(null, concate);
		});
	}

	var getPastTeamArray = function(callback) {
		async.parallel(pastCallStack, function(err, result) {
			var concate = [];
			result.forEach(function(element, index) {
				concate = concate.concat(element);
			});
			callback(null, concate);
		});
	}

	var currObjArray;
	var pastObjArray;
	async.parallel([getCurrentTeamArray, getPastTeamArray], function(err, result) {
		currObjArray = result[0];
		// console.log(result[0].length);
		pastObjArray = result[1];
		// console.log(result[1].length);
		callback_on_teamObjs(null, [currObjArray, pastObjArray]);
	})
}



//final exportable function
function getFullTeamInfo(name, callback) {
	//set global orgName
	orgName = name;

	async.waterfall([getPageCoutPerTeam, getTeamsCallStack, getTeamArrays], function(err, result) {
		// var current = result[0];
		// var past = result[1];

		// console.log(current.length);
		// console.log(past.length);

		callback(result);
	});

}

module.exports = {
	getFullTeamInfo: function(name, callback_on_2FullTeamLists) {
		return getFullTeamInfo(name, callback_on_2FullTeamLists);
	}
}