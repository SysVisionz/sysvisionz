import firebase from 'firebase';

const createUser = (email, password, persist, dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(user => {
			loginUserSuccess(dispatch, user)
		})
		.catch(() => loginUserFail(dispatch));
};

export const updateValue = ( prop, value ) => {
	return { type: 'changeVar',
		payload: {
			prop: prop,
			value: value
		}
	}
}

export const loginUser = (email, password, persist, dispatch) => {
	return (dispatch) => {
		dispatch({ type: 'loginUser' });
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then( async user => {
			loginUserSuccess(dispatch, user);
		})
		.catch((error) => {
			if (error.code === 'auth/user-not-found') {
				return {type: 'noUserError'}
			}
			else {
				loginUserFail();
			}
		});
	};
}

const loginUserFail = () => {
	return { type: 'loginFail' };
}

const loginUserSuccess = (dispatch, user) => {
	return {
		type: 'login',
		payload: user
	};
}

export const signUserOut = (dispatch) => {
	firebase.auth().signOut()
	dispatch  ({ type: 'signOut' });
};
