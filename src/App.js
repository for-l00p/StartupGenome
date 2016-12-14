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
            current: null
        }

        firebase.initializeApp(CONFIG);
        this.initDBworker = this.initDBworker.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnPanelRemove = this.handleOnPanelRemove.bind(this);
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
    	console.log(perma);

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

    handleOnPanelRemove(index) {
    	let companies = this.state.companies.slice();
    	this.setState({
    		companies: companies.splice(index, 1)
    	});
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
		    			<GenomeViewContainer DBworker={this.DBworker} companies={this.state.companies} onPanelRemoveHandler={this.handleOnPanelRemove} />
		    		</Col>
		        	<Col xs={4} md={2} ref="rightCol">
		        		<SideViewContainer DBworker={this.DBworker}  />
		        	</Col>
		        </Row> 
		    </Grid>
		    </div>
        );

    }
}

export default App;
