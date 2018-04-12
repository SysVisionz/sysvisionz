import firebase from 'firebase';


export const updateSite = ( prop, value ) => {
	console.log(prop, value);
	return {
		type: 'updateSite', 
		payload: {prop, value}
	}
}

export const userData = (user) => {
	return dispatch => {
 		firebase.database().ref(`user/${user.uid}`)
		.on('value', snapshot => {
			if (snapshot.val()) {
				dispatch({type: 'userData', payload: {user, displayName: user.displayName, email: user.email, photoUrl: user.photoUrl, ...snapshot.val()}});
			}
			else{
				dispatch({type: 'userData', payload: {user, displayName: user.displayName, email: user.email, photoUrl: user.photoUrl}});
			}
		});
	}
}

export const sendUserData = (prop, variable, isNew) => {
	const {currentUser} = firebase.auth()
		return dispatch => {
		switch (prop) {
			case 'name':
			case 'type':
			case 'website':
			case 'company':
				firebase.database().ref(`user/${currentUser.uid}/${prop}`)
				.set(variable)
				.then(() => {
					dispatch({type: 'sendDataSuccess'});
				})
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			case 'displayName':
			case 'photoUrl':
				currentUser.updateProfile ({
					[prop]: variable
				})
				.then(() => dispatch({type: 'sendDataSuccess'}))
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			case 'email':
				currentUser.updateEmail(variable)
				.then(() => dispatch({type: 'dataSuccess'}))
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			default:
				dispatch({type: 'sendDataFail', payload: 'invalid prop.'});
		}
	}
}

export const getProjects = () => {

}

export const newProject = () => {

}

export const editProject = () => {
	
}