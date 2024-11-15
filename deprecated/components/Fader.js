import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';

export default class Fader extends Component {
	constructor(props) {
		super(props);
		this.state = {in: false};
	}
	componentWillUnmount() {
		this.setState({in: false});
	}
	componentDidMount() {
		this.setState({in: true});
	}
	render () {
		return (
			<CSSTransition
				key={this.props.key}
				timeout={1000}
				appear
				enter
				exit
				classNames="fade"
				in={this.state.in}
			>
				{this.props.children}
			</CSSTransition>
		)
	}
}