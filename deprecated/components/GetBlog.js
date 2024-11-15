import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Modal} from './common';
import {BlogEdit} from './BlogEdit';
import {getBlog, editBlog, deleteBlog, changeBlog} from '../actions/';

const mapStateToProps = state => {
	const {
		_id,
		title,
		content,
		createdAt,
		editedAt,
		editingContent,
		editingTitle,
		_creator
	} = state.blog
	const {type} = state.auth
	return {
		_id,
		title,
		content,
		createdAt,
		editedAt,
		editingContent,
		editingTitle,
		_creator,
		type
	}
}

export default connect(mapStateToProps, {getBlog, editBlog, deleteBlog, changeBlog}) (class GetBlog extends Component {
	
	constructor(props) {
		super(props)
		this.state = {editingBlog : false};
	}

	componentDidUpdate() {

	}

	componentDidMount() {
		this.props.getBlog(this.props.search);
		this.props.changeBlog('editingContent', this.props.content);
		this.props.changeBlog('editingTitle', this.props.title);
	}

	render() {
		console.log(this.props);
		let button; 
		const {type, editBlog, _id, editingContent, editingTitle, changeBlog, deleteBlog} = this.props
		switch(this.props.type){
			case 'master': 
				button = (
					<div id = 'blog-buttons'>
						<div className = "button" onClick = { () => this.setState({editingBlog: true})}>Edit</div>
						<div className = "button" onClick = {() => deleteBlog(_id, localStorage.getItem('sysv-user-token'))}>Delete</div>
						<Modal open={	this.state.editingBlog}>
							<BlogEdit 
								onSubmit={() => editBlog( _id, editingContent, editingTitle) } 
								titleChange={ evt => changeBlog('editingTitle', evt.target.value) }
								titleValue = {editingTitle}
								contentChange = { evt => changeBlog('editingContent', evt.target.value)}
								contentValue = {editingContent}
							/>
						</Modal>
					</div>
				)
				break;
			case 'admin':
				button = (<div className="button" onClick = {() => this.setState({editingBlog: true})}>Edit</div>)
				break;
			default:
				break;
		}
		return (
			<div id="blog-container">
				<div id="blog-header">
					<p id = "blog-title">{this.props.title}</p>
					<p id = "blog-author">{this.props._creator}</p>
					<p id = "blog-date">{this.props.createdAt}</p>
				</div>
				<div id = "blog-contents">{this.props.content}</div>
				{button}
			</div>
		)
	}
})