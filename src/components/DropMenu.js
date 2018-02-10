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

	topSide = (initial) => [initial, this.props.topBar ? 'top' : 'side'].join(' ');

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
					return (<a className={'dropButton sub'} href={entry.link}>{entry.label.toUpperCase()}</a>)
				case 'link':
				default:
					return (<Link className={'dropButton sub'} to={entry.link}>{entry.label.toUpperCase()}</Link>)
			}
		});
		let menuStyle = {
			justifyContent: 'center', 
			backgroundSize: '100% 100%',
		};
		return(
			<Dropdown
				label={<span className={[this.topSide('dropButton main'), this.state.isOpen ? 'open' : void 0].join(' ')}>{label.toUpperCase()}</span>}
				entries={entries}
				style={{marginLeft: '5px'}}
				dropDirection = {dropDirection}
				popDirection = 'down'
				menuStyle={menuStyle}
				listItemStyle={{padding: topBar ? '5px 10px 5px 0px' : '5px 10px 5px 10px'}}
				onToggle={isOpen => this.setState({isOpen})}
			/>
		)
	}
}