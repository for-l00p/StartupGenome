import React from 'react';
import * as d3 from "d3";
import { Button, Glyphicon} from 'react-bootstrap';
import ReactFauxDOM from 'react-faux-dom'
import './GenomeChartStyle.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); //Needed for onTouchTap  http://stackoverflow.com/a/34015469/988941


function drawChart(Genes, Width) {
    // console.log("in drawChart ", Genes);
    var formatTime = d3.timeFormat("%B %d, %Y");
    //create FauxDom element for D3
    var svgNode = ReactFauxDOM.createElement('div');

    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };
    // var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var h = 250;
    var w = 950;
    var height = h - margin.top - margin.bottom - 5;
    var width = w - margin.right - margin.left - 5;
    var padding = 50;

    //draw chart
    // console.log(Genes);

    //create svg convas
    var svgContainer = d3.select(svgNode).append("svg").style('width', '100%').attr("height", height);

    //layout elements groups
    var gContainer = svgContainer.append("g");

    //caculate cubic size
    //1. find the longest array
    var len = Genes.maxlen();
    // console.log(len);
    var unit = (width / len);
    var cubicSide = 0.8 * unit;
    // console.log(unit, cubicSide);

    var dateMin = Genes.minDate();
    var dateMax = Genes.maxDate();
    // console.log("mindate:",dateMin, "maxdate:",dateMax)

    var xScale = d3.scaleTime()
        .domain([dateMin, dateMax])
        .range([0, width - padding]);

    var xAxis = d3.axisBottom(xScale);
    svgContainer.append('g').call(xAxis);

    var categoryNames = ["Employee Join", "Employee Left", "Acquisition", "Investment", "Funding", "Product"];
    var yScale = d3.scaleOrdinal()
        .domain(categoryNames)
        .range([0, height])
    var yAxis = d3.axisLeft(yScale).tickValues(categoryNames);
    svgContainer.append('g').call(yAxis);

    var tooltip = d3.select(svgNode).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    function createSubCategory(className, pos_Y) {
        var dataArray = Genes.getter(className);
        console.log(dataArray);
        
        gContainer.append("g")
            .selectAll("rect")
            .data(dataArray)
            .enter()
            .append("rect")
            .attr("class", function (d) {
                if(d.ID !== 0) return "stick id"+d.ID;
            })
            .attr("height", 2*cubicSide)
            .attr("width", 2*cubicSide)
            .attr("x", function(d, i) {
                return xScale(d.date);
            })
            .attr("y", pos_Y)
            .classed(className, true)
            .on("mouseover", function(d) {
                var info;
                if (className.includes("labor")) { //labor
                    info = d.title + "<br/>" + d.name;
                    var sel = d3.selectAll(".id"+d.ID);
                    if(sel.size() === 2) sel.classed("highlighted", true);
                } else if (className.includes("finance")) { //finance
                    if (className.includes("inv")) {
                        info = d.name + "<br/>" + d.money;
                    } else if (className.includes("frd")) {
                        info = d.type + "<br/>" + d.money;
                    } else { //product
                        info = d.name;
                    }
                } else {
                    info = d.name;
                }

                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);

                tooltip.html(formatTime(d.date) + "<br/>" + info)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);

                if (className.includes("labor")) { //labor
                    d3.selectAll(".id"+d.ID).classed("highlighted", false);
                }
            });
    }

    var gap = 4 * cubicSide;
    var categories = ["labor_enter", "labor_leave", "finance_acq", "finance_inv", "finance_frd", "marketing_prd"];
    categories.forEach(function(element, index) {
        createSubCategory(element, 50 + index++ * gap);
    });

    return svgNode.toReact();
}

class GenomeChart extends React.Component {
    constructor(props) {
        super(props);
        this.genes = props.genes;
        this.width = props.width;
        // console.log(this.width);
    }

    handleOnClick(event) {

    }

    render() {
        return (
            <div className="rj-panel">
                <div className="rj-panel-header">
                    <p className="rj-label">{this.genes.name}</p>
                    <Button  ><Glyphicon glyph="remove"/></Button>
                </div>
                {drawChart(this.genes, this.width)}
            </div>
            
        );
    }
}


export default GenomeChart;