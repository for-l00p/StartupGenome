import React from 'react';
import * as d3 from "d3";
import ReactFauxDOM from 'react-faux-dom';


function drawChart(newsArray) {

	var sorted = d3.nest()
					.key( (d) => d.date )
					.rollup((t) => t.length)
					.entries(newsArray);
	console.log(sorted);


	var svgNode = ReactFauxDOM.createElement('div');

    var svg = d3.select(svgNode),
        margin = { top: 5, right: 5, bottom: 5, left: 5 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    console.log(width, height);

    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) {
            return x(d.date); })
        .y(function(d) {
            return y(d.close); });

    d3.tsv("data.tsv", function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
        return d;
    }, function(error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, function(d) {
            return d.date; }));
        y.domain(d3.extent(data, function(d) {
            return d.close; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    });



    return svgNode.toReact();
}





class SideChart extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.product) {
            return (
                <div>
                	<p>{this.props.product.name}</p>
                	<p>Number of News: {this.props.product.count}</p>
                	
                	{ this.props.product.items && this.props.product.items.map((d,i) => {
                		console.log(d)
                		return (
                			<div>
                				<br/>
                				<p>{d.date}</p>
                				<p>{d.title}</p>
                			</div>
                		);
                	})}
                </div>
            );
        } else {
            return null;
        }
    }
}


export default SideChart;
