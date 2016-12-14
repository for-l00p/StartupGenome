orgInfo = require('./organization');

function help() {
	orgInfo.listItems();
}

function getFullTeamList(orgName, teamMode) {
	orgInfo.orgTeamTotalPageNum(orgName, teamMode, function(data) {

		pageTotal = Math.ceil(data / 100);
		console.log(pageTotal);
		if (teamMode == "current") {
			i = 1;
			while (i <= pageTotal) {
				orgInfo.orgCurrentTeam(orgName, i, function(d) {
					if (d) {
						//console.log(d);
						total = d.paging.total_items;
						pages = d.paging.number_of_pages;
						currentPage = d.paging.current_page;
						console.log("\n------------------------Current Team Info------------------------");
						console.log(total);
						console.log(pages, currentPage);
						list = d.items;
						list.forEach(function(element, index) {
							properties = element.properties;
							person = element.relationships.person.properties;

							title = properties.title;
							started = properties.started_on;
							ended = properties.ended_on;

							firstName = person.first_name;
							lastName = person.last_name;

							console.log(started, ":", firstName, lastName, "Joined as ", title);
						});
						console.log("-----------------------------------------------------------------");
					}
				});
				i++;
			}
		} else {
			i = 1;
			while (i <= pageTotal) {
				orgInfo.orgPastTeam(orgName, i, function(d) {
					if (d) {
						//console.log(d);
						total = d.paging.total_items;
						pages = d.paging.number_of_pages;
						currentPage = d.paging.current_page;
						console.log("\n------------------------Past Team Info------------------------");
						console.log(total);
						console.log(pages, currentPage);
						list = d.items;
						list.forEach(function(element, index) {
							properties = element.properties;
							person = element.relationships.person.properties;

							title = properties.title;
							started = properties.started_on;
							ended = properties.ended_on;

							firstName = person.first_name;
							lastName = person.last_name;

							console.log(started, ":", firstName, lastName, "Joined as ", title, "and left on", ended);
						});
						console.log("-----------------------------------------------------------------");
					}
				});

				i++;
			}
		}

	});
}


function extractData(orgName) {
	//check
	orgInfo.DATA_PROPERTIES(orgName, function(data) {
		if (data) {
			console.log("\n------------------------Funded Time------------------------");
			funded = data.founded_on;
			isClosed = data.is_closed;
			closed = data.closed_on;

			console.log(funded, ":", orgName, "funded");
			if (isClosed) {
				console.log(closed, ":", orgName, "closed");
			}
			console.log("-----------------------------------------------------------------");
		}
	});

	//check
	orgInfo.orgFundingRounds(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				list = data.items;
				console.log("\n------------------------Funding rounds Info------------------------");
				list.forEach(function(element, index) {
					properties = element.properties;

					funding_type = properties.funding_type;
					series = properties.series;
					announcedDate = properties.announced_on;
					moneyRaised = properties.money_raised;

					console.log(announcedDate, ":", orgName, "is funded", moneyRaised, "in series", series, "(" + funding_type + ")");
				});
				console.log("-----------------------------------------------------------------");
			}
		}
	});


	orgInfo.orgAcquiredBy(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				console.log("\n------------------------Acquired Info------------------------");
				properties = data.item.properties;

				price = properties.price;
				paymentType = properties.payment_type;
				announcedDate = properties.announced_on;
				completedDate = properties.completed_on;
				acquisitionType = properties.acquisition_type;

				acquirer = data.item.relationships.acquirer.properties.name;

				console.log(orgName, "was acquired by", acquirer, "with a price at", price, "paid in", paymentType);
				console.log("It was announced on", announcedDate, "and completed on", completedDate);

				console.log("-----------------------------------------------------------------");
			}
		}
	});


	orgInfo.orgIPO(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				console.log("\n------------------------IPO Info--------------------------------");
				properties = data.item.properties;

				exchange = properties.stock_exchange_symbol;
				symbol = properties.stock_symbol;
				shares = properties.shares_sold;
				date = properties.went_public_on;
				openPrice = properties.opening_share_price;
				moneyRaised = properties.money_raised;
				valuation = properties.opening_valuation;

				console.log(date, ":", orgName, "went public at", exchange);
				console.log("At open price", openPrice, "per share,", shares, "shares were sold.");
				console.log("It raised", moneyRaised, "and the valuation was", valuation);


				console.log("-----------------------------------------------------------------");
			}
		}
	});

	//check
	orgInfo.orgAcquisitions(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				list = data.items;
				console.log("\n------------------------Acquisitions Info------------------------");
				list.forEach(function(element, index) {
					properties = element.properties;
					acquireeProperties = element.relationships.acquiree.properties;

					price = properties.price;
					paymentType = properties.payment_type;
					announcedDate = properties.announced_on;

					acquireeName = acquireeProperties.name;

					console.log(announcedDate, ":", orgName, "acquired", acquireeName, "with", price, "using", paymentType);
				});
				console.log("-----------------------------------------------------------------");
			}
		}
	});


	orgInfo.orgInvestments(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				list = data.items;
				console.log("\n------------------------Investments Info------------------------");
				list.forEach(function(element, index) {
					properties = element.properties;
					fundingProperties = element.relationships.funding_round.properties;
					fundingDetails = element.relationships.funding_round.relationships.funded_organization.properties;

					moneyInvested = properties.money_invested;
					isLead = properties.is_lead_investor;

					fundingType = fundingProperties.funding_type;
					series = fundingProperties.series;
					announcedDate = fundingProperties.announced_on;
					closedDate = fundingProperties.closed_on;
					moneyRaised = fundingProperties.money_raised;

					investedOrg = fundingDetails.name;

					console.log(announcedDate, ":", orgName, "invested", investedOrg, "in its series", series, "with", moneyInvested, "out of a total of", moneyRaised);
				});
				console.log("-----------------------------------------------------------------");
			}
		}
	});


	orgInfo.orgProducts(orgName, function(data) {
		if (data) {
			if (data.paging.total_items !== 0) {
				list = data.items;
				console.log("\n------------------------Products Info------------------------");
				list.forEach(function(element, index) {
					properties = element.properties;
					name = properties.name;
					launch = properties.launched_on;
					close = properties.closed_on;

					if (close != null) {
						console.log(launch, ":", "product", name, "is launched", "and it's closed on", close);
					} else {
						console.log(launch, ":", "product", name, "is launched");
					}
				});
				console.log("-----------------------------------------------------------------");
			}
		}
	});

	getFullTeamList(orgName, "current");
	getFullTeamList(orgName, "past");
}


module.exports = {
  help: function() {
    return help();
  },
  extractData: function (orgName) {
  	return extractData(orgName);
  }
}