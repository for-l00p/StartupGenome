orgInfo = require('./organization');
teamInfo = require('./team');
var async = require('async');

var asyncTasks = [];
var orgName;
var realName;
var permalink;

var call0_getBasicInfo = function(callback) {
	orgInfo.DATA_PROPERTIES(orgName, function(data) {
		if (data) {
			realName = data.name;
			permalink = data.permalink;
			var basics = {
				funded: data.founded_on,
				isClosed: data.is_closed,
				closed: data.closed_on,
				short: data.short_description
			}
			callback(null, basics);
		}
	});
}

var call1_getFundingRounds = function(callback) {

	var FundingRoundsObj = [];
	orgInfo.orgFundingRounds(orgName, function(data) {
		if (data) {
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no Funding Rounds data for " + orgName);
				// callback(null, null);
			}
			if (data.paging.total_items !== 0) {
				list = data.items;
				list.forEach(function(element, index) {
					properties = element.properties;
					var obj = {
						funding_type: properties.funding_type,
						series: properties.series,
						announcedDate: properties.announced_on,
						moneyRaised: properties.money_raised
					}
					FundingRoundsObj.push(obj);
				});
			}
			callback(null, FundingRoundsObj);
		}
	});
}

var call2_getAcquisitions = function(callback) {
	var AcquisitionsObj = [];
	orgInfo.orgAcquisitions(orgName, function(data) {
		if (data) {
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no Acquisitions data for " + orgName);
				// callback(null, null);
			}
			if (data.paging.total_items !== 0) {
				list = data.items;
				list.forEach(function(element, index) {
					properties = element.properties;
					acquireeProperties = element.relationships.acquiree.properties;

					var obj = {
						price: properties.price,
						paymentType: properties.payment_type,
						announcedDate: properties.announced_on,
						acquireeName: acquireeProperties.name
					}
					AcquisitionsObj.push(obj);
				});
			}
			callback(null, AcquisitionsObj);
		}
	});
}

var call3_getAcquiredBy = function(callback) {
	orgInfo.orgAcquiredBy(orgName, function(data) {
		var obj = null;
		if (data) {
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no AcquiredBy data for " + orgName);
				// callback(null, null);
			}
			if (data.paging.total_items !== 0) {
				properties = data.item.properties;

				obj = {
					price: properties.price,
					paymentType: properties.payment_type,
					announcedDate: properties.announced_on,
					completedDate: properties.completed_on,
					acquisitionType: properties.acquisition_type,
					acquirer: data.item.relationships.acquirer.properties.name
				}
			}
			callback(null, obj);
		}
	});
}

var call4_getIPO = function(callback) {
	orgInfo.orgIPO(orgName, function(data) {
		if (data) {
			var obj = null;
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no IPO data for " + orgName);
				// callback(null, null);
			} else {
				properties = data.item.properties;
				obj = {
					exchange: properties.stock_exchange_symbol,
					symbol: properties.stock_symbol,
					shares: properties.shares_sold,
					date: properties.went_public_on,
					openPrice: properties.opening_share_price,
					moneyRaised: properties.money_raised,
					valuation: properties.opening_valuation
				}
			}
			callback(null, obj);
		}
	});
}

var call5_getInvestments = function(callback) {
	orgInfo.orgInvestments(orgName, function(data) {
		if (data) {
			var InvestmentsObj = [];
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no Investments data for " + orgName);
				// callback(null, null);
			} else {
				list = data.items;

				list.forEach(function(element, index) {
					properties = element.properties;
					fundingProperties = element.relationships.funding_round.properties;
					fundingDetails = element.relationships.funding_round.relationships.funded_organization.properties;

					var obj = {
						moneyInvested: properties.money_invested,
						isLead: properties.is_lead_investor,

						fundingType: fundingProperties.funding_type,
						series: fundingProperties.series,
						announcedDate: fundingProperties.announced_on,
						closedDate: fundingProperties.closed_on,
						moneyRaised: fundingProperties.money_raised,

						investedOrg: fundingDetails.name
					}

					InvestmentsObj.push(obj);
				});
			}

			callback(null, InvestmentsObj);
		}
	});
}

var call6_getProducts = function(callback) {
	orgInfo.orgProducts(orgName, function(data) {
		if (data) {
			var ProductsObj = [];
			if (data.paging.total_items == 0) {
				// console.log("WARNING: no Products data for " + orgName);
				// callback(null, null);
			} else {
				list = data.items;
				list.forEach(function(element, index) {
					properties = element.properties;
					var obj = {
						name: properties.name,
						perma: properties.permalink,
						launch: properties.launched_on,
						close: properties.closed_on,
						description: properties.short_description
					}
					ProductsObj.push(obj);
				});
			}
			callback(null, ProductsObj);
		}
	});
}

var call7_getTeams = function(callback) {
	teamInfo.getFullTeamInfo(orgName, function(twoTeams) {
		callback(null, twoTeams);
	});
}

function getCompanyInfo(name, callback_on_complete_CompanyObj) {
	//set global orgName
	orgName = name;

	asyncTasks.push(call0_getBasicInfo); //result[0]
	asyncTasks.push(call1_getFundingRounds); //result[1]
	asyncTasks.push(call2_getAcquisitions); //result[2]
	asyncTasks.push(call3_getAcquiredBy); //result[3]
	asyncTasks.push(call4_getIPO); //result[4]
	asyncTasks.push(call5_getInvestments); //result[5]
	asyncTasks.push(call6_getProducts); //result[6]
	asyncTasks.push(call7_getTeams); //result[7]

	// console.log(asyncTasks);
	// console.log('\n');

	async.parallel(asyncTasks, function(err, result) {

		if (err) console.log(err);
		else {
			var productsPermaList = [];
			result[6].forEach( function(element, index) {
				productsPermaList.push(element.perma);
			});

			var companyObj = {
				Name : realName,
				perma : permalink,
				BasicInfo: result[0],
				FundingRounds: result[1],
				Acquisitions: result[2],
				AcquiredBy: result[3],
				IPO: result[4],
				Investments: result[5],
				Products: result[6],
				ProductsPermas : productsPermaList,
				CurrentTeam: result[7][0],
				PastTeam: result[7][1],
			}
			console.log(orgName+" obj generated");
			callback_on_complete_CompanyObj(companyObj);
		}
	});

}

function help() {
	console.log("Accessible Fileds:\n 1) BasicInfo  2)FundingRounds  3)Acquisitions  \n4)AcquiredBy  5)IPO  6)Investments \n7)Products  8)CurrentTeam 9)PastTeam");
}

module.exports = {
	help: function() {
		return help();
	},
	getCompanyInfo: function(name, callback_on_complete_CompanyObj) {
		return getCompanyInfo(name, callback_on_complete_CompanyObj);
	}
}