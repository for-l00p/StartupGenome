qs = require('qs');
var userKey = process.env.CRUNCHBASE_KEY;
var endpoint='https://api.crunchbase.com/v/3/';
var keyParam, config = {};

function init() {
  config.apikey = userKey;
  keyParam = 'user_key=' + config.apikey;
}

function getOrganizationsUrl(params) {
  return endpoint
  + 'organizations' + '?' + keyParam
  + '&' + qs.stringify(params);
}

function getOrganizationUrl(permalink) {
  return endpoint
  + 'organizations/' + permalink + '?' + keyParam;
}

function getOrganizationFullUrl (permalink, pageNo) {

  requestUrl = endpoint + 'organizations/' + permalink + '?'+ "page="+ pageNo + '&' +keyParam;
  return requestUrl;
}

function getProductNewsFullUrl(permalink, pageNo) {
  // https://api.crunchbase.com/v/3/products/facebook-messenger-11/news?page=2&user_key=d551f2bff6f0a66f66c8dab0a0796fd8
  requestUrl = endpoint + 'products/' + permalink + '/news?page='+ pageNo + '&' +keyParam;
  return requestUrl;
}

function getPeopleUrl(page){
  return endpoint
  + 'people' + '?' + keyParam
  + '&' + qs.stringify(page);
}

function getPersonUrl(permalink){
  return endpoint
  + 'people/' + permalink + '?' + keyParam;
}

function getProductsUrl(params) {
  return endpoint
  + 'products' + '?' + keyParam
  + '&' + qs.stringify(params);
}

function getProductUrl(permalink) {
  return endpoint
  + 'products/' + permalink + '?' + keyParam;
}

function getFundingRoundsUrl(updated_since) {
  return endpoint
  + 'funding-rounds' + '?' + 'updated_since=' + updated_since
  + '&' + keyParam;
}

function getFundingRoundUrl(uuid) {
  return endpoint
  + 'funding-rounds/' + uuid + '?' + keyParam;
}

function getAcquisitionsUrl() {
  return endpoint
  + 'acquisitions/' + '?' + keyParam;
}

function getAcquisitionUrl(uuid) {
  return endpoint
  + 'acquisitions/' + uuid + '?' + keyParam;
}

function getIPOSUrl() {
  return endpoint
  + 'ipos' + '?' + keyParam;
}

function getIPOUrl(uuid) {
  return endpoint
  + 'ipos/' + uuid + '?' + keyParam;
}

function getFundsUrl(uuid) {
  return endpoint
  + 'funds/' + uuid + '?' + keyParam;
}

function getLocationsUrl(params) {
  return endpoint
  + 'locations' + '?' + keyParam
  + '&' + qs.stringify(params);
}

function getCategoriesUrl() {
  //params = params.split(' ');
  return endpoint
  + 'categories' + '?'
  + keyParam;
}


function getDeletePage(pageNo, callback) {
  return endpoint
  + 'deletes?page=' + pageNo
  + '&' + keyParam;
}

function getDeleteType(entity_type, callback) {
  return endpoint
  + 'deletes/' + entity_type
  + '?' + keyParam;
}

module.exports = {
  init: function() {
    return init();
  },
  getOrganizationsUrl: function(params) {
    return getOrganizationsUrl(params);
  },
  getOrganizationUrl: function(permalink) {
    return getOrganizationUrl(permalink);
  },
  getOrganizationFullUrl: function(permalink, pageNo) {
    return getOrganizationFullUrl(permalink, pageNo);
  },
  getProductNewsFullUrl: function(permalink, pageNo) {
    return getProductNewsFullUrl(permalink, pageNo);
  },
  getPeopleUrl: function(page) {
    return getPeopleUrl(page);
  },
  getPersonUrl: function(permalink) {
    return getPersonUrl(permalink);
  },
  getProductsUrl: function(params) {
    return getProductsUrl(params);
  },
  getProductUrl: function(permalink) {
    return getProductUrl(permalink);
  },
  getFundingRoundsUrl: function(updated_since) {
    return getFundingRoundsUrl(updated_since);
  },
  getFundingRoundUrl: function(uuid) {
    return getFundingRoundUrl(uuid);
  },
  getAcquisitionsUrl: function() {
    return getAcquisitionsUrl();
  },
  getAcquisitionUrl: function(uuid) {
    return getAcquisitionUrl(uuid);
  },
  getIPOSUrl: function() {
    return getIPOSUrl();
  },
  getIPOUrl: function(uuid) {
    return getIPOUrl(uuid);
  },
  getFundsUrl: function(uuid) {
    return getFundsUrl(uuid);
  },
  getLocationsUrl: function(params) {
    return getLocationsUrl(params);
  },
  getCategoriesUrl: function(params) {
    return getCategoriesUrl(params);
  },
  getDeletePage: function(pageNo, callback) {
    return getDeletePage(pageNo, callback);
  },
  getDeleteType: function(entity_type, callback) {
    return getDeleteType(entity_type, callback);
  }
}

