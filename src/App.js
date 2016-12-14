import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import { Grid, Row, Col, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { CONFIG } from './META';
import DBworker from './DataUtils/DBworker';
import GenomeViewContainer from './GenomeView/GenomeViewContainer';
import SideViewContainer from './SideView/SideViewContainer';

class App extends Component {

    constructor() {
        super();

        this.state = {
            leftColWidth: null,
            rightColWidth: null,
            companies: [],
            current: null,
            product: null
        }

        firebase.initializeApp(CONFIG);
        this.initDBworker = this.initDBworker.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnPanelRemove = this.handleOnPanelRemove.bind(this);
        this.handleOnProductHover = this.handleOnProductHover.bind(this);
        this.nameToPerma = this.nameToPerma.bind(this);
    }

    componentWillMount() {
        this.initDBworker();
    }

    componentDidMount() {
        this.setState({
            leftColWidth: ReactDOM.findDOMNode(this.refs.leftCol).getBoundingClientRect().width,
            rightColWidth: ReactDOM.findDOMNode(this.refs.rightCol).getBoundingClientRect().width
        });
    }

    initDBworker() {
        this.DBworker = new DBworker(firebase.database());
    }

    nameToPerma(name) {
    	return name;
    }

    handleOnClick(event) {
    	let perma = this.nameToPerma(this.state.current);

    	this.DBworker.getCompany(perma, function (companyGenes) {
    		let companies = this.state.companies.slice();
    		companies.push(companyGenes);
    		this.setState({
    			companies : companies
    		})
    		console.log(companies);
    	}.bind(this));

    }

    handleOnChange(event) {
    	this.setState( {
    		current: event.target.value
    	});
    }

    //control panels
    handleOnPanelRemove(perma) {
    	let companies = this.state.companies.slice();
    	let idx;
    	for (var i = 0; i < companies.length; i++) {
    		if(companies[i].perma === perma) {
    			idx = i;
    			break;
    		}
    	}
    	// console.log("before ",companies);
    	companies.splice(idx, 1);
    	// console.log(idx);
    	// console.log("after ",companies);
    	this.setState({
    		companies: companies
    	});
    }

    //control sideview
    handleOnProductHover(productPerma) {
    	this.DBworker.getProduct(productPerma, function (productObj) {
    		// console.log(productObj);
    		this.setState({
    			product : productObj
    		})
    	}.bind(this));
    }

    render() {
        return (
            <div>
            <Navbar>
    			<Navbar.Header>
	     			<Navbar.Brand>
	       				<a href="#">Startup Genome</a>
	     			</Navbar.Brand>
		        	<Navbar.Toggle />
		    	</Navbar.Header>
		    	<Navbar.Collapse>
			      	<Navbar.Form pullRight>
				        <FormGroup>
				        	<FormControl type="text" placeholder="Search" ref="searchBox" onChange={this.handleOnChange} />
				        </FormGroup>
				        {' '}
				        <Button type="submit" onClick={this.handleOnClick} >Add</Button>
			      	</Navbar.Form>
		    	</Navbar.Collapse>
		  	</Navbar>
		  	<Grid>
		         <Row>
		    		<Col xs={14} md={10} ref="leftCol">
		    			<GenomeViewContainer companies={this.state.companies} onPanelRemoveHandler={this.handleOnPanelRemove} onProductHover={this.handleOnProductHover} />
		    		</Col>
		        	<Col xs={4} md={2} ref="rightCol">
		        		<SideViewContainer product={this.state.product} />
		        	</Col>
		        </Row>
		    </Grid>
		    </div>
        );

    }
}

export default App;
