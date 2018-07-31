import request from 'request-promise'
import socketIOClient from 'socket.io-client';

export const updateSite = ( prop, value ) => {
	return {
		type: 'updateSite', 
		payload: {prop, value}
	}
}

export const sendTutorMessage = (message, classes, currentUser) => {
	return dispatch => {

	}
}

export const checkTutorMessages = () => {
	return dispatch => {

	}
}

export const resetSite = () => {
	return {type: 'siteReset'};
}

export const sendCompanyData = ( token, prop, variable) => {
	return dispatch => {

	}
}

export const submitTutor = (skillList, user) => {
	let skills = [];
}

export const approveSkill = (skillList, uid) => {
	let skills = []
}


export const getSkillData = (currentUser) => {
	return dispatch => {
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