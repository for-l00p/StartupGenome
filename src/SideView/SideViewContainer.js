import React from 'react';
import SideChart from './SideChart'

class SideViewContainer extends React.Component {
	constructor(props) {
        super(props);
    }

    render() {
        return <SideChart product={this.props.product} />
    }
}

export default SideViewContainer;