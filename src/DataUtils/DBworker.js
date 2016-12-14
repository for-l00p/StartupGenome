import { getGenes } from './data';

class DBworker {

    constructor(DB) {
    	this.DB = DB;
    	if(this.DB) console.log('DB for the app instantiated');

    	this.getCompany = this.getCompany.bind(this);
    	this.getProduct = this.getProduct.bind(this);
    }

    getCompany(name, callback) {
    	var refStr = "companies/" + name;
    	this.DB.ref(refStr).once("value").then(function(snapshot) {
            var Genes = getGenes(snapshot.val());
    		callback(Genes);
    	});
    }

    getProduct(name, callback) {
        var refStr = "products/" + name;
        this.DB.ref(refStr).once("value").then(function(snapshot) {
            callback(snapshot.val());
        });
    }

}

export default DBworker;