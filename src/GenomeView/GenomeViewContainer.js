import React from 'react';
import GenomeChart from './GenomeChart';
import '../DataUtils/DBworker';

class GenomeViewContainer extends React.Component {
	constructor(props) {
        super(props);  
        this.DBworker = props.DBworker;

        this.onProdcutHover = this.onProdcutHover.bind(this);
    }

    onProdcutHover(perma) {
    	this.props.onProductHover(perma);
    }

    render() {
    	
    	return (
    	<div>
    		{this.props.companies && this.props.companies.map((d,i) => {
    			return <GenomeChart key={d.perma} genes={d} width={this.props.width} onPanelRemoveHandler={this.props.onPanelRemoveHandler} onProdcutHover={this.onProdcutHover} />
    		})}
    	</div>);
    	
    }
}

export default GenomeViewContainer;