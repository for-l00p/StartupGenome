import React from 'react';
import GenomeChart from './GenomeChart';
import '../DataUtils/DBworker';

class GenomeViewContainer extends React.Component {
	constructor(props) {
        super(props);  
        this.DBworker = props.DBworker;

        this.state = {
        	Genes : null
        }
    }

    componentDidMount() {
    	this.DBworker.getCompany("facebook", function (genes) {
    		this.setState({
    			Genes : genes
    		})
    	}.bind(this));
    }

    render() {
    	if(this.state.Genes) {
    		return (
    		<div>

    			<GenomeChart genes={this.state.Genes} width={this.props.width} />;

    			{this.props.companies && this.props.companies.map((d,i) => {
    				return <p>{d}</p>;
    			})}
    		</div>);
    	} else {
    		return <div> GenomeView Loading ... </div>
    	}
    }
}

export default GenomeViewContainer;