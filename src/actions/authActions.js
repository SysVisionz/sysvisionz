import firebase from 'firebase';

export const createUser = (email, password) => {
	return dispatch => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(user => {
			loginUserSuccess(dispatch, user);
		})
		.catch(error => {
			loginUserFail(dispatch)
		});
	}
}

export const closeModal = () => {
	return ({type: 'closeModal'});
}

export const promoteAdmin = () => {
	return dispatch => {
		const uid = firebase.auth().currentUser.uid;
		firebase.database().ref(`masterAdmin`)
		.set({[uid]: true})
		.then(dispatch({type: 'adminSuccess'}));
	}
}

export const demoteAdmin = uid => {
	return dispatch => {
		firebase.database().ref(`masterAdmin`)
		.on('value', snapshot => {
			if (snapshot.uid){
				firebase.database().ref(`admin`)
				.set({[uid]: true})
				.then(() => {
					firebase.database().ref(`masterAdmin`)
					.set({[uid]: false})
					return dispatch => dispatch({type: 'demoteSuccess'});
				})
			}
		})
		.then(() => {
			firebase.database().ref(`admin`)
			.on('value', snapshot => {
				if (snapshot.uid) {
					firebase.database().ref('client')
					.set({[uid]: true})
					.then(() => {
						firebase.database().ref('admin')
						.set({[uid]: false})
						return dispatch => dispatch({type: 'demoteSuccess'});
					})
				}
			})
		})
		.catch(() => dispatch => dispatch({type: 'demoteFail'}));
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

export const loginUser = (email, password, persist) => {
	return (dispatch) => {
		dispatch({type: 'loggingIn'})
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then( async user => {
			firebase.database().ref(`user/${user.uid}`)
			.on('value', snapshot => {
				const {greeting, messages} = snapshot.val();
				loginUserSuccess(dispatch, user, greeting, messages);
			})
		})
		.catch((error) => {
			if (error.code === 'auth/user-not-found') {
				dispatch ({type: 'noUser'});
			}
			else {
				loginUserFail(dispatch);
			}
		});
	};
}

const loginUserFail = (dispatch) => {
	dispatch ({ type: 'loginFail' });
}

const loginUserSuccess = (dispatch, user, greeting, messages) => {
	dispatch ({
		type: 'login',
		payload: {user, greeting, messages}
	});
}

export const userSignedIn = () => {
	return dispatch => {
		firebase.auth().onAuthStateChanged( function (user) {
			let greeting;
			let messages;
			if (user) {
				firebase.database().ref(`user/${user.uid}`)
				.on('value', snapshot => {
					greeting = snapshot.val();
				});
				firebase.database().ref(`messages/${user.uid}`)
				.on('value', snapshot => {
					messages = snapshot.val();
				})
			}
			dispatch ({type: 'login', payload: {user, greeting, messages}});
		});
	}
}

export const signUserOut = (dispatch) => {
	return dispatch => {
		firebase.auth().signOut()
		dispatch ({ type: 'signOut' });
	}
};