request = require('request'),
urlHelper = require('./cbAPI_helper');

// Query Params
// updated_since:  timestamp
// When provided, restricts the result set to Organizations where updated_at >= the passed value
// query:  string
// Full text search of an Organization's name, aliases (i.e. previous names or "also known as"), and short description
// name: string
// Full text search limited to name and aliases
// domain_name:  string
// Text search of an Organization's domain_name (e.g. www.google.com)
// categories: string
// Filter by categories (comma separated, AND'd together) e.g. categories=Automotive,Public Transportation
// category_uuids: string
// Filter by one or more Categories. Separate multiple UUIDs with commas. When passed, multiple UUIDs are logically AND'd together
// locations:  string
// Filter by location names (comma separated, AND'd together) e.g. locations=California,San Francisco
// organization_types: string
// Filter by one or more types. Multiple types are separated by commas. Available types are "company", "investor", "school", and "group". Multiple organization_types are logically AND'd.
// sort_order: stringcreated_at DESC
// The sort order of the collection. Options are "created_at ASC", "created_at DESC", "updated_at ASC", and "updated_at DESC"
// page: integer1
// Page number of the results to retrieve.

function init() {
  urlHelper.init();
}

function getOrganizations(params, callback) {
  var url = urlHelper.getOrganizationsUrl(params);
  createRequest(url, callback);
}

function getOrganization(permalink, callback) {
  var url = urlHelper.getOrganizationUrl(permalink);
  createRequest(url, callback);
}

function getOrganizationFull(permalink, pageNo, callback) {
  var url = urlHelper.getOrganizationFullUrl(permalink, pageNo);
  createRequest(url, callback);
}

function getProductFullNews(permalink, pageNo, callback) {
  var url = urlHelper.getProductNewsFullUrl(permalink, pageNo);
  createRequest(url, callback);
}

function getPeople(page, callback){
  var url = urlHelper.getPeopleUrl(page);
  createRequest(url, callback);
}

function getPerson(permalink, callback){
  var url = urlHelper.getPersonUrl(permalink);
  createRequest(url, callback);
}

function getProducts(params, callback) {
  var url = urlHelper.getProductsUrl(params);
  createRequest(url, callback);
}

function getProduct(permalink, callback) {
  var url = urlHelper.getProductUrl(permalink);
  createRequest(url, callback);
}

function getFundingRounds(updated_since, callback) {
  var url = urlHelper.getFundingRoundsUrl();
  createRequest(url, callback);
}

function getFundingRound(uuid, callback) {
  var url = urlHelper.getFundingRoundUrl(uuid);
  createRequest(url, callback);
}

function getAcquisitions(callback) {
  var url = urlHelper.getAcquisitionsUrl();
  createRequest(url, callback);
}

function getAcquisition(uuid, callback) {
  var url = urlHelper.getAcquisitionUrl(uuid);
  createRequest(url, callback);
}

function getIPOS(callback) {
  var url = urlHelper.getIPOSUrl();
  createRequest(url, callback);
}

function getIPO(uuid, callback) {
  var url = urlHelper.getIPOUrl(uuid);
  createRequest(url, callback);
}

function getFunds(uuid, callback) {
  var url = urlHelper.getFundsUrl(uuid);
  createRequest(url, callback);
}

function getLocations(params, callback) {
  var url = urlHelper.getLocationsUrl(params);
  createRequest(url, callback);
}

function getCategories(callback) {
  var url = urlHelper.getCategoriesUrl();
  createRequest(url, callback);
}

function getDeletePage(pageNo, callback) {
  var url = urlHelper.getDeletePage(pageNo);
  createRequest(url, callback);
}

function getDeleteType(entity_type, callback) {
  var url = urlHelper.getDeleteType(entity_type);
  createRequest(url, callback);
}

function createRequest(url, callback) {
  request(url, function (error, response, body) {
    try {
      callback(error, JSON.parse(body));
    } catch (error) {
      console.log(error);
      console.log("reach limit\nexit as failure");
      process.exit(1);//exit with failure, 0 would be success in ENV
    }
  });
}

module.exports = {
  init: function() {
    return init();
  },
  organizations: function(params, callback) {
    return getOrganizations(params, callback);
  },
  organizationFull: function(params, pageNo, callback) {
    return getOrganizationFull(params, pageNo, callback);
  },
  organization: function(permalink, callback) {
    return getOrganization(permalink, callback);
  },
  people: function(page, callback) {
    return getPeople(page, callback);
  },
  person: function(permalink, callback) {
    return getPerson(permalink, callback);
  },
  products: function(params, callback) {
    return getProducts(params, callback);
  },
  product: function(permalink, callback) {
    return getProduct(permalink, callback);
  },
  productNews: function (permalink, pageNo, callback){
    return getProductFullNews(permalink, pageNo, callback);
  },
  fundingRounds: function(updated_since, callback) {
    return getFundingRounds(updated_since,callback);
  },
  fundingRound: function(uuid, callback) {
    return getFundingRound(uuid, callback);
  },
  acquisitions: function(callback) {
    return getAcquisitions(callback);
  },
  acquisition: function(uuid, callback) {
    return getAcquisition(uuid, callback);
  },
  ipos: function(callback) {
    return getIPOS(callback);
  },
  ipo: function(uuid, callback) {
    return getIPO(uuid, callback);
  },
  funds: function(uuid, callback) {
    return getFunds(uuid, callback);
  },
  locations: function(params, callback) {
    return getLocations(params, callback);
  },
  categories: function(callback) {
    return getCategories(callback);
  },
  deletePage: function(pageNo, callback) {
    return getDeletePage(pageNo, callback);
  },
  deleteType: function(entity_type, callback) {
    return getDeleteType(entity_type, callback);
  }
}
