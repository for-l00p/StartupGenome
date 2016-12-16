import * as d3 from "d3";

var re = /(C[A-Z]O|VP|Head|Senior|President|Found|Chief|Exe|Partner)/ig;

function filter(title) {
    //console.log(title.match(re));
    if (title.match(re) != null) {
        return true;
    }
    return false;
}

export function getGenes(companyObj) {
    // console.log(companyObj);
    var obj = companyObj;
    var perma = obj.perma;
    var name = obj.Name;
    var basics = obj.BasicInfo;
    var acquisitions = obj.Acquisitions
    var currenteam = obj.CurrentTeam
    var fundingRounds = obj.FundingRounds
    var IPO = obj.IPO
    var investments = obj.Investments
    var pastteam = obj.PastTeam
    var products = obj.Products

    function compareDate(e1, e2) {
        if (e1.date < e2.date) return -1;
        if (e1.date > e2.date) return 1;
        return 0
    }
    // category 1  basics, IPO
    var begin_end = [{
        date: new Date(basics.funded),
        type: "funded"
    } ];

    if(IPO !== undefined) {
        begin_end.push({
            date: new Date(IPO.date),
            type: "IPO"
        })
    }

    //category 2  current, past team
    var hr = {
        enter: [],
        leave: [],
        none: []
    };
    currenteam.forEach(function(employee, index) {
        if (filter(employee.title)) {
            var obj = {
                date: new Date(employee.started),
                title: employee.title,
                name: employee.firstName + " " + employee.lastName,
                ID: 0
            }
            if (employee.started) {
                hr.enter.push(obj);
            } else {
                hr.none.push(obj);
            }
        }

    });
    // console.log(pastteam);
    var IDcounter = 1;
    pastteam.forEach(function(employee, index) {
        if (filter(employee.title)) {
            if (employee.started) {
                var enterObj = {
                    date: new Date(employee.started),
                    title: employee.title,
                    name: employee.firstName + " " + employee.lastName,
                    ID: IDcounter
                }
                hr.enter.push(enterObj);
            }

            if (employee.ended) {
                var leaveObj = {
                    date: new Date(employee.ended),
                    title: employee.title,
                    name: employee.firstName + " " + employee.lastName,
                    ID: IDcounter
                }
                hr.leave.push(leaveObj);
            }

            IDcounter++;

            if (employee.started === undefined && employee.ended === undefined) {
                var obj = {
                    title: employee.title,
                    name: employee.firstName + " " + employee.lastName
                }
                hr.none.push(obj);
            }
        }

    });
    hr.enter.sort(compareDate);
    hr.leave.sort(compareDate);


    //category 3 product, funding, investments
    var finance = {
        acq: [],
        inv: [],
        frd: []
    };
    if (acquisitions !== undefined) {
        acquisitions.forEach(function(acquisition, index) {
            if (acquisition.announcedDate) {
                var acqObj = {
                    date: new Date(acquisition.announcedDate),
                    name: acquisition.acquireeName
                }
                finance.acq.push(acqObj);
            } else {
                console.log('acquisition with no date', acquisition);
                // finance.none.push({
                //  name: acquisition.acquireeName
                // });
            }
        });
        finance.acq.sort(compareDate);
    }
    if (investments !== undefined) {
        investments.forEach(function(investment, index) {
            if (investment.announcedDate) {
                var invObj = {
                    date: new Date(investment.announcedDate),
                    name: investment.investedOrg,
                    money: investment.moneyRaised
                }
                finance.inv.push(invObj);
            } else {
                console.log('investment with no date', investment);
                // finance.none.push({
                //  name: investment.investedOrg
                // });
            }
        });
        finance.inv.sort(compareDate);
    }

    if (fundingRounds !== undefined) {
        fundingRounds.forEach(function(funding, index) {
            if (funding.announcedDate) {
                var frdObj = {
                    date: new Date(funding.announcedDate),
                    type: funding.funding_type,
                    money: funding.moneyRaised
                }
                finance.frd.push(frdObj);
            } else {
                console.log('funding with no date', funding);
            }
        });
        finance.frd.sort(compareDate);
    }

    // finance.acq.sort(compareDate);
    // finance.inv.sort(compareDate);
    // finance.frd.sort(compareDate);
    // console.log(finance);

    //category 4 products
    var marketing = {
        prd: [],
        none: []
    };
    if (products !== undefined) {
        products.forEach(function(product, index) {
            // console.log(product);
            if (product.launch) {
                var prdObj = {
                    date: new Date(product.launch),
                    name: product.name,
                    perma : product.perma
                }
                marketing.prd.push(prdObj);
            } else {
                marketing.none.push({
                    name: product.name,
                    perma : product.perma
                });
            }
        });
        marketing.prd.sort(compareDate);
    }
    
    // console.log(market);

    var Genes = {
        name: name,
        perma: perma,
        timeFrame: begin_end,
        labor: hr,
        financial: finance,
        market: marketing,
        //methods
        maxlen: function() {
            var lenArray = [begin_end.length, hr.enter.length, hr.leave.length,
                finance.acq.length, finance.inv.length, finance.frd.length,
                marketing.prd.length
            ]
            return d3.max(lenArray);
        },
        minDate: function() {
            var dateArray = [begin_end[0].date];

            if(hr.enter.length > 0) dateArray.push(hr.enter[0].date);
            if(finance.acq.length > 0) dateArray.push(finance.acq[0].date);
            if(finance.inv.length > 0) dateArray.push(finance.inv[0].date);
            if(finance.frd.length > 0) dateArray.push(finance.frd[0].date);
            if(marketing.prd.length > 0) dateArray.push(marketing.prd[0].date);

            // console.log(dateArray);

            return d3.min(dateArray);
        },
        maxDate: function() {
            var dateArray = [begin_end[begin_end.length - 1].date];
            
            if(hr.enter.length > 0) dateArray.push(hr.enter[hr.enter.length - 1].date);
            if(finance.acq.length > 0) dateArray.push(finance.acq[finance.acq.length - 1].date);
            if(finance.inv.length > 0) dateArray.push(finance.inv[finance.inv.length - 1].date);
            if(finance.frd.length > 0) dateArray.push(finance.frd[finance.frd.length - 1].date);
            if(marketing.prd.length > 0) dateArray.push(marketing.prd[marketing.prd.length - 1].date);

            return d3.max(dateArray);
        },
        getter: function(arrayName) {
            switch (arrayName) {
                case "labor_enter":
                    return hr.enter;
                case "labor_leave":
                    return hr.leave;
                case "finance_acq":
                    return finance.acq;
                case "finance_inv":
                    return finance.inv;
                case "finance_frd":
                    return finance.frd;
                case "marketing_prd":
                    return marketing.prd;
                default:
                    console.log("Data Not Exits")
                    break;
            }
        }
    }

    return Genes;
}
