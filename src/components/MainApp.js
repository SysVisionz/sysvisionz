import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {
	Home, 
	Sysvisionz, 
	Page, 
	App, 
	WP, 
	Email, 
	Backend, 
	Invoices, 
	Projects, 
	NewProject, 
	Details, 
	Settings
} from './';



export default class MainApp extends Component {
	constructor(props){
		super(props);
		this.state = {
			style: {
				...props.style,
			},
			loaded: true
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({style: nextProps.style});
	}

	imageLoaded = () => {
		this.state.toLoad--;
		this.state.toLoad < 1 ? this.setState({loaded: true}) : void 0;
	}

	imageCount = (count) => {
		this.state.toLoad = count;
	}
	
	render() {
		return (
			<div style = {this.state.style}>
				<Route exact path = '/' render = {props => (<Home {...this.props} />)} />
				<Route path = '/about/sysvisionz' render = {props => (<Sysvisionz {...this.props} />)} />
				<Route path = '/service/page' render = {props => (<Page {...this.props} />)} />
				<Route path = '/service/app' render = {props => (<App {...this.props} />)} />
				<Route path = '/service/wp' render = {props => (<WP {...this.props} />)} />
				<Route path = '/service/email' render = {props => (<Email {...this.props} />)} />
				<Route path = '/service/backend' render = {props => (<Backend {...this.props} />)} />
				<Route path = '/account/invoices' render = {props => (<Invoices {...this.props} />)} />
				<Route path = '/account/projects' render = {props => (<Projects {...this.props} />)} />
				<Route path = '/account/newProject' render = {props => (<NewProject {...this.props} />)} />
				<Route path = '/account/details' render = {props => (<Details {...this.props} />)} />
				<Route path = '/account/settings' render = {props => (<Settings {...this.props} />)} />
			</div>
		)
	}
}