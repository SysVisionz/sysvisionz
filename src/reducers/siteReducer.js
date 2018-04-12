const INITIAL_STATE = {
	projects: undefined,
	email: undefined,
	user: undefined,
	displayName: undefined,
	name: undefined,
	company: undefined,
	error: undefined,
	type: undefined,
	website: undefined
};

export default (state = INITIAL_STATE, action ) => {
	const {type, payload} = action;
	switch (type) {
		case 'updateSite':
			return {...state, [payload.prop]: payload.value};
		case 'loadProjects':
			return {...state, projects: payload};
		case 'userData':
			return {...state, ...payload};
		case 'sendDataFail':
			return {...state, error: payload};
		case 'updateFail':
			return {...state, error: action.prop};
		default:
			return state;
	}
}