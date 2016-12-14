import React from 'react';

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
                	{ this.props.product.items.length && this.props.product.items.map((d,i) => {
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
