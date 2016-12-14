company = require('./myAPI/company.js');
var mongoose = require('mongoose');
var fs = require('fs');
var csv = require('csv-parser')
var async = require('async');

mongoose.connect('mongodb://localhost:27017/startup_genome');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.error.bind(console, 'connection built!');

  //-------------------------------- company template ------------//
  //construct Schema for company
  var companySchema = mongoose.Schema({
    BasicInfo: Object,
    FundingRounds: Array,
    Acquisitions: Array,
    AcquiredBy: Object,
    IPO: Object,
    Investments: Array,
    Products: Array,
    CurrentTeam: Array,
    PastTeam: Array
  });
  companySchema.methods.setter = function(name, companyObj) {
      this.name = name;
      this.BasicInfo = companyObj.BasicInfo;
      this.FundingRounds = companyObj.FundingRounds;
      this.Acquisitions = companyObj.Acquisitions;
      this.AcquiredBy = companyObj.AcquiredBy;
      this.IPO = companyObj.IPO;
      this.Investments = companyObj.Investments;
      this.Products = companyObj.Products;
      this.CurrentTeam = companyObj.CurrentTeam;
      this.PastTeam = companyObj.PastTeam;
    }
    //compile Schema into model, serve as class template
    // NOTE: methods must be added to the schema 
    // before compiling it with mongoose.model()
  var Company = mongoose.model("Company", companySchema);

  //---------------------------------------------------------------//

  var stream = fs.createReadStream("sf_companyList.csv");
  var nameStack = [];
  var callStack = [];
  stream.pipe(csv()).on('data', function(data) {
    var name = data.cb_url.substring(14);
    nameStack.push(name);
  }).on('end', function() {
    console.log(nameStack.length);

    nameStack.forEach(function(comName, index) {
      callStack.push(function(callback_when_finish_set) {
        company.getCompanyInfo(comName, function(companyObj) {
          currentCompany = new Company();
          currentCompany.setter(comName, companyObj);
          callback_when_finish_set(null, currentCompany);
        });
      })
    });
    console.log(callStack.length);
    async.series(callStack, function(err, result) {
      console.log(result.length);
    })
  });

  //---------------------------------------------------------------//

});