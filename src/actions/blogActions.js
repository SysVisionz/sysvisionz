import firebase from 'firebase'

export const editBlog = (dispatch, blogId, name, contents, userEdit) => {
	return dispatch => {
		firebase.database().ref(`/blog/contents/${blogId}`)
		.set({name, contents, userEdit})
		.then(() => {
			getBlogs();
			dispatch({type: 'editSuccess'});
		})
		.catch (error => {
			dispatch({type: 'editFail', payload: error});
		});
	}
}

export const updateBlog = () => {
	
}

export const newBlog = (name, contents, user) => {
	firebase.database().ref('blog/lastBlogNum')
	.on('value', snapshot => {
		const blogId=snapshot.val()+1;
		firebase.database().ref(`blog/content/${blogId}`)
		.on( 'value', snapshot => {
			return (dispatch) => {
				firebase.database().ref(`blog/contents/${blogId}`)
				.push({name, contents, user, Id: blogId})
				.then(() => {
					getBlogs();
					dispatch({type: 'newSuccess'});
				})
				.catch (error => {
					dispatch({type: 'newFail', payload: error})
				});
			}
		});
	})
}

export const getBlogs = (dispatch) => {
	return dispatch => () => {
		firebase.database().ref('blog/contents')
		.on('value', snapshot => {
			dispatch({type: 'blogReturn', payload: snapshot.val()})
		})
		.catch (error => {
			dispatch ({type: 'blogReturnFail', payload: error})
		});
	}
}