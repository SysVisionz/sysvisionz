import React, {Component} from 'react'

export default class WordChain extends Component = () => {
	
	constructor() {
		super()
		this.state = {
			position = 0;
		}
	}

	componentDidMount = () => {
		let position = 0;
		const words = this.props.children.split(' ');

		const animate = setInterval(() => {
			if 
		}, this.props.delay);
	}

	render() {
		return (
				{wordChain}
		)
	}
}