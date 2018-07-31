import request from 'request-promise'

export const editBlog = (blogId, title, description, content, token) => {
	return dispatch => {
		
	}
}

export const deleteBlog = (blogId, token) => {
	return dispatch => {
		
	}
}

export const changeBlog = (prop, value) => ({type: 'changeBlog', payload: {prop, value}})

export const newBlog = (title, content, description, token) => {
	return dispatch => {
		request({
			method: 'POST',
			url: window.location.origin + '/blog',
			headers: {
				'x-auth': token
			},
			body: {
				title,
				content,
				description
			}
		}, (err, res, body) => {
			if (!err && res.statusCode === 200) { dispatch({type: 'newSuccess'})}
			else if (err) {
				dispatch({
					type: 'newFail',
					payload: err.message
				})
			}
		})
	}
}

export const getBlogs = () => {
	return dispatch => {
		request({
			method: 'GET',
			url: window.location.origin + '/blog/list',
		}, (err, res, body) => {
			if (!err && res.statusCode === 200) {
				dispatch({
					type: 'blogList',
					payload: res.body
				})
			}
		})
	}
}

export const getBlog = (query) => {
	return dispatch => {
		if (query){
			query = query.substring(4)
			request({
				uri: window.location.origin + '/blog/get',
				method: 'GET',
				headers:{
					'_id': query
				}
			}, (err, res, body) => {
				if (!err && res.statusCode === 200) {
					dispatch({
						type: 'blog',
						payload: res.body
					})
				}
			})
		}
	}
}