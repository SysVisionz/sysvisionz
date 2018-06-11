import React, {Component} from 'react'

export default class AnimBox extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			up: false,
			id: "animBox" + Math.round(Math.random()*10000),
			content: props.cover,
			clickedUp: false
		};
		this.counter = 0;
	}

	className = () => {
		if (this.state.up == null){
			return this.props.midClass;
		}
		else {
			return this.props.downClass 
				? this.state.up ? this.props.className : this.props.downClass
				: this.props.className;
		}
	}

	clickSwitch = () => {
		if(!this.props.clicked[this.props.identity]){
			document.addEventListener('click', this.flipDown);
			this.count(true);
		}
	}

	flipDown = evt => {
		this.props.isUp(this.props.identity, false);
		document.removeEventListener('click', this.flipDown);
		this.count(false);
	}

	count = up => {
		const {delay, isUp, identity} = this.props;
		if (this.counterInterval) {clearInterval(this.counterInterval)};
		this.setState({up: null});
		this.counterInterval = setInterval(() => {
			up ? this.counter+=10 : this.counter-=10;
			if ((this.state.up === null && (up && this.counter >= delay/2)) || (!up && this.counter <= delay/2)) { this.setState( {up, content: up ? this.props.children : this.props.cover} ) }
			if (this.counter >= delay || this.counter <=0){
				clearInterval(this.counterInterval);
				this.counter = up ? delay : 0;
				isUp(identity, up);
			}
		}, 10);
	}

	render() {
		return (
			<div
				id={this.props.id}
				onClick={() => this.clickSwitch()}
				onMouseEnter={() => Object.values(this.props.clicked).indexOf(true) === -1 ? this.count(true) : null} 
				onMouseLeave={() => Object.values(this.props.clicked).indexOf(true) === -1 ? this.count(false) : null} 
				className = {this.className() + ' container'}
			>
				<div className={this.className()}> 
					{this.state.content}
				</div>
			</div>		
		)
	}
}