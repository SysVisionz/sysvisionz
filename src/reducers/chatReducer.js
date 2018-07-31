const INITIAL_STATE = {
	chatList : [],
	currentChat : {},
	message: '',
	activeChat: undefined,
	activeChats: [],
	error: ''
}

export default (state=INITIAL_STATE, action) => {
	const {type, payload} = action;
	switch (type) {
		// case 'updateChat':
		// 	return {...state, [payload.prop]: payload.value}
		// case 'sendSuccess':
		// 	return {...state, message: '', error: ''}
		// case 'pickChat':
		// 	chatIndex = {id: payload['_id'], name: payload.name, newMessages: payload.}
		// 	if (state.activeChats.indexOf(payload) === -1){
		// 		state.activeChats.push(payload)
		// 	}
		// 	return {...state, currentChat: payload}
		// case 'closeChat':
		// 	if(state.activeChats.indexOf(payload) !== -1){
		// 		state.activeChats.splice(state.activeChats.indexOf(payload), 1);
		// 		if (payload._id === currentChat._id){
		// 			return {...state, currentChat: {}};
		// 		}
		// 		return {...state};
		// 	}
		default:
			return {...state}
	}
}