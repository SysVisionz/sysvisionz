import React {Component} from 'react';

export default class DropItem extends Component{
	render(props) {
		const { group, id, style, link, target, children} = this.props;
		const clickItem = (link) => {
			 = link;
		}
		return (
			<div class={group} onClick="window.location.{link}" style={style}>
				{children}
			</div>
		);
	}
}