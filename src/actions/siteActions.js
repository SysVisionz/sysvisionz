import firebase from 'firebase';


export const updateSite = ( prop, value ) => {
	return {
		type: 'updateSite', 
		payload: {prop, value}
	}
}

export const updateCompany = (prop, value) => {
	return {
		type: 'updateCompany',
		payload: {prop, value}
	}
}

export const updatePersonal = (prop, value) => {
	return {
		type: 'updatePersonal',
		payload: {prop, value}
	}
}

export const userData = (user) => {
	if (user) {
		return dispatch => {
	 		firebase.database().ref(`user/${user.uid}`)
			.on('value', snapshot => {
				if (snapshot.val()) {
					dispatch({type: 'data', payload: {displayName: user.displayName, email: user.email, photoUrl: user.photoUrl, ...snapshot.val()}});
				}
				else{
					dispatch({type: 'data', payload: {displayName: user.displayName, email: user.email, photoUrl: user.photoUrl}});
				}
			});
		}
	}
	else { return {type: 'getUserFail'}}
}

export const sendTutorMessage = (message, classes, currentUser) => {
	const user = currentUser;
	return dispatch => {
		firebase.database().ref(`tutorApproval`)
		.push({user, message, classes})
		.then(dispatch({type: 'sendTutorMessageSuccess'}))
		.catch(dispatch({type: 'sendTutorMessageFail'}));
	}
}

export const checkTutorMessages = () => {
	return dispatch => {
		firebase.database.ref(`tutorApproval`);
	}
}

export const resetSite = () => {
	return {type: 'siteReset'};
}

export const sendUserData = ( user, prop, variable, isCompany) => {
	return dispatch => {
		switch (prop) {
			case 'pAddressActive':
			case 'cAddressActive':
			case 'type':
			case 'website':
			case 'greeting':
				firebase.database().ref(`user/${user.uid}/${prop}`)
				.set(variable)
				.then(() => {
					dispatch({type: 'sendDataSuccess'});
				})
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			case 'displayName':
			case 'photoUrl':
				user.updateProfile ({
					[prop]: variable
				})
				.then(() => dispatch({type: 'sendDataSuccess'}))
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			case 'email':
				user.updateEmail(variable)
				.then(() => dispatch({type: 'sendDataSuccess'}))
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			case 'name':
			case 'street':
			case 'city':
			case 'state':
			case 'zip':
				const category = isCompany ? 'company' : 'personal';
				firebase.database().ref(`user/${user.uid}/${category}/${prop}`)
				.set(variable)
				.then(() => {
					dispatch({type: 'sendDataSuccess'});
				})
				.catch(error => dispatch({type: 'sendDataFail', payload: error}));
				break;
			default:
				dispatch({type: 'sendDataFail', payload: 'invalid prop.'});
		}
	}
}

export const typeCheck = (user) => {
	return dispatch => {
		if (user){
			firebase.database().ref(`user/${user.uid}/type`)
			.on('value', snapshot => {
				dispatch({type: 'userType', payload: snapshot.val()});
			});
		}
	}
}

export const submitTutor = (skillList, user) => {
	let skills = [];
	for (const skill of skillList) {
		skills.push(skill);
	}
	firebase.database.ref(`tutor/${user.uid}/requested`)
	.set(skills)
	.then(dispatch => dispatch({type: 'submitTutorSuccess'}))
	.catch((dispatch, error) => dispatch({type: 'submitTutorFail', payload: error}));
}

export const approveSkill = (skillList, uid) => {
	let skills = []
	for (const skill of skillList) {
		skills[skill] = true;
	}
	firebase.database().ref(`user/${uid}/approved`)
	.set(skillList);
	firebase.database().ref(`messages/new/tutor/${uid}`)
	.push()
}


export const getSkillData = (currentUser) => {
	return dispatch => {
		firebase.database().ref(`siteData/tutor`)
		.on('value', snapshot => {
			const {genres, subjects} = snapshot.val();
			if (currentUser) {
				firebase.database().ref(`user/${currentUser.uid}/tutor`)
				.on('value', snapshot => {

				})
			}
			else {
				dispatch({
					type: 'data', 
					payload: {
						genres, 
						subjects
					}
				});
			}
		})
	}
}

export const getProjects = () => {

}

export const newProject = () => {

}

export const editProject = () => {
	
}

export const sendMessages = () => {

}

export const getMessageList = (user) => {
	
}