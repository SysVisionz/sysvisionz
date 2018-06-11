import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import Fader from './Fader'; 
import {editBlog, newBlog, getBlogs, updateBlog, typeCheck} from '../actions';

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

export default connect (mapStateToProps, {editBlog, newBlog, getBlogs, updateBlog, typeCheck}) (class Home extends Component {
	constructor () {
		super();
		this.state = {
			createOpen: false,
			blogId: false
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(() => this.props.typeCheck());
	}

	returnBlogs = () => {
		this.props.getBlogs();
		if (this.props.blogs){
			this.props.blogs.map(blog => {
				return (
					<div className="blog">
						<div>
							<span>{blog.name}</span>
							<button hidden={this.props.type !== 'admin' || this.props.type !== 'master'} onClick={this.setState({createOpen: true, blogId: blog.Id})}>Edit</button>
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