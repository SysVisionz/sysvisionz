import React, {Component} from 'react'
import {connect} from 'react-redux';
import {selectChat} from '../actions/'
import {Attention} from './common/'

const mapStateToProps = state => {
	const {
		activeChats,
		activeChat
	} = state.chat
	const {
		attentions
	} = state.auth
	return {
		activeChat,
		activeChats,
		attentions
	}
}

export default connect (mapStateToProps, {selectChat}) (class Chat extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	chatTabs = this.props.activeChats.map( chat => (<div className = "button chat-tab" onclick={() => selectChat(chat._id)}>{chat.name}</div>))

	openClick = () => this.setState({open: true});

	closeClick = () => this.setState({open: false});

	messages = () => this.props.activeChat(chat => (<span>{chat.user} ({chat.createdAt}): {chat.message}</span>))

	sendChat = evt => {
		console.log(evt);
	}

	currentContent = () => {
		if (!this.state.open) {
			return (
				<div id="chat-button" 
				className="button" 
				onClick={this.openClick}>
					<Attention on={this.props.attentions.chat}>
						Chat
					</Attention>
				</div>)
		}
		return (
			<div id="chat-container">
				<div id="active-chats-row">
					{this.chatTabs}
				</div>
				<div id="chat-main">
					<div id="chat-top">
						<div class="button chat-tab" hidden={!this.props.attentions.chat}><Attention on={this.props.attentions.chat}>New Messages</Attention></div>
						<div class="button chat-tab">All Chats</div>
					</div>
					<div id="chat-message-box">{this.messages}</div>
					<div id="chat-input-box">
						<form onSubmit = {this.sendChat}>
							<input onChange={this.props.updateChat} />
							<div id="chat-submit" class="button">Send</div>
						</form>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return this.currentContent();
	}
})