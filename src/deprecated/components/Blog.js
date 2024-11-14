import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fader from './Fader'; 
import {newBlog, getBlogs} from '../actions';
import Modal from './common/Modal';

const mapStateToProps = state => {
	const {
		blogs,
		blogId,
		name,
		contents,
		error
	} = state.blog;
	const {
		type
	} = state.site;
	const {
		user
	} = state.auth;
	return {
		blogs,
		blogId,
		name,
		contents,
		user,
		error,
		type
	};
}

export default connect (mapStateToProps, {newBlog, getBlogs}) (class Home extends Component {
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
					<div className="blogEntry">
						<div>
							<Link to={"blog/ref?blog="+encodeURI(blog._id)}>{blog.name}</Link>
							<button hidden={this.props.type !== 'admin' || this.props.type !== 'master'} onClick={this.setState({createOpen: true, blogId: blog.Id})}>Edit</button>
						</div>
						<div>
							<span>{blog.description}</span>
						</div>
					</div>
				)
			});
		}
		else{
			return <span>{this.props.error}</span>;
		}
	}

	buttonRender() {
		if (this.props.type === 'admin' || this.props.type === 'master') {return <button onClick={() => this.setState({createOpen: true})}>New Blog Entry</button>}
	}

	render () {
		return (
			<Fader key={this.props.key}>
				<div>
					<div className="titleText">Coming Soon</div>
					{this.returnBlogs()}
					{this.buttonRender()}
				</div>
			</Fader>
		)
	}
})