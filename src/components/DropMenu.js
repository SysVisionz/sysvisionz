import React, { Component } from 'react';
import Dropdown from 'sysvisionz-react-dropdown';
import {Link} from 'react-router-dom';

export default class DropMenu extends Component {
	constructor(props) {
		super(props);
		let isOpen;
		this.state = {
			isOpen
		}
	}

	componentDidUpdate(){
		this.state.wasOpen != this.state.isOpen ? this.props.onToggle(this.state.isOpen): void 0;
	}

	componentWillUpdate(){
		this.state.wasOpen = this.state.isOpen;
	}

	render() {
		const {label, topBar} = this.props;
		let {entries} = this.props;
		const dropDirection = topBar ? 'down' : 'right';
		const colors = ['rgba(152,241,255, 1)'];
		for (let i = 0; i < 4; i++){
			colors.push('rgba(0,0,0,0)');
		}
		const rcolors = [...colors];
		rcolors.reverse();
		entries = entries.map((entry, index) => {
			switch(entry.type){
				case 'a':
					return (<a className={'dropButton' + this.state.isOpen ? ' menuItem' : void 0} style={{textDecoration: 'none', color: '#fff', fontStyle: 'italic'}} href={entry.link}>{entry.label.toUpperCase()}</a>)
				case 'link':
				default:
					return (<Link className={'dropButton' + this.state.isOpen ? ' menuItem' : void 0} style={{textDecoration: 'none', color: '#fff', fontStyle: 'italic'}} to={entry.link}>{entry.label.toUpperCase()}</Link>)
			}
		});
		let buttonStyle = { 
			paddingRight: 5,
			paddingLeft:5,
			paddingTop:5,
			paddingBottom:5,
			margin: 5, 
			width:100, 
			dropShadow: '2px 2px 5px black',
			textShadow: '1px 1px 5px black'
		};
		if (topBar){ 
			buttonStyle = this.state.isOpen ? {
				...buttonStyle,
				paddingBottom: '5px'
			}
			: {
				...buttonStyle,
				paddingBottom: '4px',
				marginBottom: '1px',
			}
		}
		else {
			buttonStyle = this.state.isOpen ? {
				...buttonStyle,
			}
			: {
				...buttonStyle,
				paddingRight: '3px',
				marginRight: '2px'
			}
		};
		let menuStyle = {
			justifyContent: 'center', 
			backgroundSize: '100% 100%'
		};
		menuStyle = topBar
		? {
			...menuStyle,
			marginLeft: '5px',
		}
		: {
			...menuStyle,
			marginTop: '5px',
		};
		return(
			<Dropdown
				label={<span className='dropButton'>{label.toUpperCase()}</span>}
				entries={entries}
				style={{marginLeft: '5px'}}
				dropDirection = {dropDirection}
				popDirection = 'down'
				menuStyle={menuStyle}
				buttonStyle={buttonStyle}
				listItemStyle={{whiteSpace:'nowrap', padding:'5px 10px 5px 10px'}}
				onToggle={isOpen => this.setState({isOpen})}
				delay={200}
			/>
		)
	}
}