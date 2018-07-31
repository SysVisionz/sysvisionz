import request from 'request-promise';

export const createUser = (email, password, persist) => {
	return dispatch => {
		request({
			uri: window.location.origin + '/users',
			method: 'POST',
			body: {email, password, persist},
			json: true,
			resolveWithFullResponse: true
		})
		.then( res => dispatch({type: 'login', payload: {...res.body, token: res.headers['x-auth']}}) )
		.catch( err => dispatch( {type: 'createUserFail', payload: err.body } ) )
	}
}

export const closeModal = () => {return {type: 'closeModal'}};

export const promoteAdmin = (token, target) => {
	return dispatch => {
		request({
			method: 'POST',
			uri: window.location.origin + window.location.origin + '/users/promote',
			headers: {
				'x-auth': token
			},
			body: {target},
			json: true
		})
		.then(res => dispatch( {type: 'promoteUserSuccess', payload: res} ) )
		.catch(err => dispatch ({type: 'promoteUserFail', payload: err} ) );
	}
}

export const demoteAdmin = (target, token) => {
	return dispatch => {
		request({
			method: 'POST',
			uri: window.location.origin + '/users/demote',
			headers: {
				'x-auth': token
			},
			body: {target},
			json: true
		})
		.then( res => dispatch( {type: 'demoteUserSuccess', payload: res} ) )
		.catch( err => dispatch( {type: 'demoteUserFail', payload: err} ) );
	}
}

export const updateValue = ( prop, value ) => {
	return { 
		type: 'updateValue',
		payload: {
			prop: prop,
			value: value
		}
	};
}

export const updateUserType = (token, type, target) => {
	return dispatch => {
		request({
			method: 'POST',
			headers: {
				'x-auth': token
			},
			body: {
				target
			},
			json: true
		})
	}
}

export const loginClick = () => {
	return {type: 'loggingIn'}
}

export const sendUserData = (token, prop, value, prefix) => {
	const body = prefix ? {[prefix]:{[prop]: value}} : {[prop]: value};
	return dispatch => {
		request({
			method: 'POST',
			uri: window.location.origin + '/users/update',
			headers: {
				'x-auth': token
			},
			body,
			json:true
		})
		.catch(err => dispatch({type: 'userDataFail', payload: err.message}))
	}
}

export const loginUser = (email, password, persist, socket) => {
	return dispatch => {
		request({
			method: 'POST',
			uri: window.location.origin + '/users/login',
			body: {
				email,
				password,
				persist
			},
			json: true,
			resolveWithFullResponse: true
		})
		.then( res => {
			socket.emit('signIn', res.headers['x-auth']);
			dispatch({
				type: 'login', 
				payload: {
					...res.body,
					token: res.headers['x-auth']
				}
			}) 
		})
		.catch( err => {
			if (err.statusCode === 400) {
				dispatch({type: 'noUser'})
			}
			else{
				dispatch({ type: 'loginFail' });
			}
		});
	}
}

export const userData = (token) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: window.location.origin + '/users/me',
			json: true,
			headers: {
				'x-auth': token
			},
			resolveWithFullResponse: true
		})
		.then (res => dispatch ({type: 'userData', payload: res}))
		.catch (err => dispatch ({type: 'userDataFail', payload: err.message}))
	}
}

export const userSignedIn = (token, socket) => {
	return dispatch => {
		request({
			method: 'GET',
			uri: window.location.origin + '/users/me',
			json: true,
			headers: {
				'x-auth': token
			},
			resolveWithFullResponse: true
		})
		.then( res => {
			socket.emit('signIn', token)
			dispatch({type: 'login', payload: {...res.body, token: res.headers['x-auth']}})
		})
		.catch( err => dispatch( {type: 'userNotIn'} ) )

	}
}

export const signUserOut = (token) => {
	return dispatch => {
		request({
			method: 'DELETE',
			uri: window.location.origin + '/users/logout',
			json: true,
			headers: {
				'x-auth': token
			}
		})
		.then( res => dispatch({type: 'logout'}) )
		.catch( err => dispatch({type: 'logoutFail', payload: err}) );
	}
};