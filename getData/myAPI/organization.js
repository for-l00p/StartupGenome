var cb = require('./base');
cb.init();

function listItems() {
  console.log(
    "[1st level]\ndata\n\n[2nd level]\nproperties, relationships\n\n[3rd level]\nshortDescription, description\nfounders, current_team, past_team, board_members_and_advisors,\ninvestors, owned_by, sub_organizations, offices, headquarters,products,\ncategories, customers, competitors, memberships,members, funding_rounds,\ninvestments, acquisitions,acquired_by,ipo, funds, websites, images, videos, news\n");
}

function META(orgName,callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.metadata);
    } else {
      console.log(error);
    }
  });
}

function DATA_PROPERTIES (orgName,callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.properties);
    } else {
      console.log(error);
    }
  });
}

function orgShortDescription (orgName,callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.properties.short_description);
    } else {
      console.log(error);
    }
  });
}

function orgDescription (orgName,callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.properties.description);
    } else {
      console.log(error);
    }
  });
}

function orgFounders(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.founders);
    } else {
      console.log(error);
    }
  });
}

function orgTeamTotalPageNum(orgName, mode, callback) {
  if(mode == "current") {
      cb.organization(orgName, function(error, results) {
      if (!error) {
        return callback(results.data.relationships.current_team.paging.total_items);
      } else {
        console.log(error);
      }
    });
  } else {
    cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.past_team.paging.total_items);
    } else {
      console.log(error);
    }
  });
  }
  
}

function orgCurrentTeam(orgName, pageNo, callback) {
  para = orgName + "/current_team";
  cb.organizationFull(para, pageNo, function(error, results) {
    if (!error) {
      return callback(results.data);
    } else {
      console.log(error);
    }
  });
}

function orgPastTeam(orgName, pageNo, callback) {
  para = orgName + "/past_team";
  cb.organizationFull(para, pageNo, function(error, results) {
    if (!error) {
      return callback(results.data);
    } else {
      console.log(error);
    }
  });
}

function orgBoard(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.board_members_and_advisors);
    } else {
      console.log(error);
    }
  });
}

function orgInvestors(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.investors);
    } else {
      console.log(error);
    }
  });
}

function orgOwnedBy(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.owned_by);
    } else {
      console.log(error);
    }
  });
}

function orgSubOrgs(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.sub_organizations);
    } else {
      console.log(error);
    }
  });
}

function orgOffices(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.offices);
    } else {
      console.log(error);
    }
  });
}

function orgHQ(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.headquarters);
    } else {
      console.log(error);
    }
  });
}

function orgProducts(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.products);
    } else {
      console.log(error);
    }
  });
}
  
function orgCategories(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.categories);
    } else {
      console.log(error);
    }
  });
}

function orgCustomers(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.customers);
    } else {
      console.log(error);
    }
  });
}

function orgCompetitors(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.competitors);
    } else {
      console.log(error);
    }
  });
}

function orgMemberships(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.memberships);
    } else {
      console.log(error);
    }
  });
}
 
function orgMembers(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.members);
    } else {
      console.log(error);
    }
  });
}

function orgFundingRounds(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.funding_rounds);
    } else {
      console.log(error);
    }
  });
}

function orgInvestments(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.investments);
    } else {
      console.log(error);
    }
  });
}

function orgAcquisitions(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.acquisitions);
    } else {
      console.log(error);
    }
  });
}

function orgAcquiredBy(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.acquired_by);
    } else {
      console.log(error);
    }
  });
}

function orgIPO(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.ipo);
    } else {
      console.log(error);
    }
  });
}

function orgFunds(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.funds);
    } else {
      console.log(error);
    }
  });
}

function orgImages(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.images);
    } else {
      console.log(error);
    }
  });
}
function orgVideos(orgName, callback) {
  cb.organization(orgName, function(error, results) {
    if (!error) {
      return callback(results.data.relationships.videos);
    } else {
      console.log(error);
    }
  });
}

function orgNews(orgName, callback) {
	cb.organization(orgName, function(error, results) {
		if (!error) {
			return callback(results.data.relationships.news);
		} else {
			console.log(error);
		}
	});
}

//--------------------- NEWS -------------------------//
// function getProductNewsCount(product, callback) {
//   cb.product(product, function(error, results) {
//     if (!error) {
//       console.log(results.data.relationships.news.paging.total_items);
//       return callback(results.data.relationships.news.paging.total_items);
//     } else {
//       console.log(error);
//     }
//   });
// }

// function getProductNews(product, pageNo, callback) {
//   cb.productNews(product, pageNo, function(error, results) {
//     if (!error) {
//       console.log(results);
//       return callback(results);
//     } else {
//       console.log(error);
//     }
//   });
// }



module.exports = {
  listItems: function() {
    return listItems();
  },

  META: function(orgName,callback) {
    return META(orgName, callback);
  },
  DATA_PROPERTIES: function(orgName,callback) {
    return DATA_PROPERTIES(orgName,callback);
  },
  orgShortDescription: function(orgName,callback) {
    return orgShortDescription(orgName,callback);
  },
  orgDescription: function(orgName,callback) {
    return orgDescription(orgName,callback);
  },
  orgFounders: function(orgName, callback) {
    return orgFounders(orgName, callback);
  },
  orgTeamTotalPageNum: function(orgName, mode, callback){
    return orgTeamTotalPageNum(orgName, mode, callback);
  },
  orgCurrentTeam: function(orgName, pageNo, callback) {
    return orgCurrentTeam(orgName, pageNo, callback);
  },
  orgPastTeam: function(orgName, pageNo, callback) {
    return orgPastTeam(orgName, pageNo, callback);
  },
  orgBoard: function(orgName, callback) {
    return orgBoard(orgName, callback);
  },
  orgInvestors: function(orgName, callback) {
    return orgInvestors(orgName, callback);
  },
  orgOwnedBy: function(orgName, callback) {
    return orgOwnedBy(orgName, callback);
  },
  orgSubOrgs: function(orgName, callback) {
    return orgSubOrgs(orgName, callback);
  },
  orgOffices: function(orgName, callback) {
    return orgOffices(orgName, callback);
  },
  orgHQ: function(orgName, callback) {
    return orgHQ(orgName, callback);
  },
  orgProducts: function(orgName, callback) {
    return orgProducts(orgName, callback);
  },
  orgCategories: function(orgName, callback) {
    return orgCategories(orgName, callback);
  },
  orgCustomers: function(orgName, callback) {
    return orgCustomers(orgName, callback);
  },
  orgCompetitors: function(orgName, callback) {
    return orgCompetitors(orgName, callback);
  },
  orgMemberships: function(orgName, callback) {
    return orgMemberships(orgName, callback);
  },
  orgMembers: function(orgName, callback) {
    return orgMembers(orgName, callback);
  },
  orgFundingRounds: function(orgName, callback) {
    return orgFundingRounds(orgName, callback);
  },
  orgInvestments: function(orgName, callback) {
    return orgInvestments(orgName, callback);
  },
  orgAcquisitions: function(orgName, callback) {
    return orgAcquisitions(orgName, callback);
  },
  orgAcquiredBy: function(orgName, callback) {
    return orgAcquiredBy(orgName, callback);
  },
  orgIPO: function(orgName, callback) {
    return orgIPO(orgName, callback);
  },
  orgFunds: function(orgName, callback) {
    return orgFunds(orgName, callback);
  },
  orgWebsites: function(orgName, callback) {
    return orgWebsites(orgName, callback);
  },
  orgImages: function(orgName, callback) {
    return orgImages(orgName, callback);
  },
  orgVideos: function(orgName, callback) {
    return orgVideos(orgName, callback);
  },
	orgNews: function(orgName, callback) {
		return orgNews(orgName, callback);
	}
}


