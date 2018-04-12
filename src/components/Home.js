import React, {Component} from 'react';
import {connect} from 'react-redux';
import Fader from './Fader'; 
import {editBlog, newBlog, getBlogs, updateValue} from '../actions';

const mapStateToProps = state => {
	const {
		blogs,
		blogId,
		name,
		contents,
		error
	} = state.blog;
	const {
		user
	} = state.auth;
	return {
		blogs,
		blogId,
		name,
		contents,
		user,
		error
	};
}

export default connect (mapStateToProps, {editBlog, newBlog, getBlogs, updateValue}) (class Home extends Component {
	constructor () {
		super();
		this.state = {
			createOpen: false,
			blogId: false
		}
	}

	returnBlogs = () => {
		this.props.getBlogs();
		if (this.props.blogs){
			this.props.blogs.map(blog => {
				return (
					<div className="blog">
						<div>
							<span>{blog.name}</span>
							<button hidden={!this.props.user || !this.props.user.admin} onClick={this.setState({createOpen: true, blogId: blog.Id})}>Edit</button>
						</div>
						<div>
							<span>{blog.contents}</span>
						</div>
					</div>
				)
			});
		}
		else{
			return <span>{this.props.error}</span>;
		}
	}

	render () {
		let nextBlogId = Math.round(Math.random()*10000);
		return (
			<Fader key={this.props.key}>
				<div>
					{this.returnBlogs()}
					<button onClick={() => this.setState({createOpen: true, blogId: nextBlogId})} hidden={!this.props.user || !this.props.user.admin}>New Blog Entry</button>
				</div>
			</Fader>
		)
	}
})