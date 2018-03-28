import React from 'react';
import Dropdown from 'sysvisionz-react-dropdown';
import {Link} from 'react-router-dom';

export const DropMenu = (props) => {
	const {label, topBar} = props;
	let {entries} = props;
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
				return (<a target='_blank' className={'dropButton sub'} href={entry.link}>{entry.label.toUpperCase()}</a>)
			case 'link':
			default:
				return (<Link className={'dropButton sub'} to={entry.link} onClick={props.onLinkClick}>{entry.label.toUpperCase()}</Link>)
		}
	});
	let menuStyle = {
		justifyContent: 'center', 
		backgroundSize: '100% 100%',
	};
	let classNameObj = ['dropButton main', props.topBar ? 'top' : 'side'].join(' ');
	if (props.isOpen) {
		classNameObj.concat(' open');
	}
	return(
		<Dropdown
			label={<span className={classNameObj}>{label.toUpperCase()}</span>}
			entries={entries}
			style={{marginLeft: '5px'}}
			dropDirection = {dropDirection}
			popDirection = 'down'
			menuStyle={menuStyle}
			listItemStyle={{padding: topBar ? '5px 10px 5px 0px' : '5px 10px 5px 10px'}}
			onToggle={props.onToggle}
		/>
	)
}