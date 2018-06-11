const INITIAL_STATE = {
	projects: undefined,
	email: undefined,
	displayName: undefined,
	photoUrl: undefined,
	personal: {},
	company: {},
	error: undefined,
	type: undefined,
	greeting: undefined,
	messages: undefined,
	requested: undefined,
	genres: undefined,
	subjects: undefined,
	website: undefined,
	pAddressActive: undefined,
	cAddressActive: undefined,
};

export default (state = INITIAL_STATE, action ) => {
	const {type, payload} = action;
	switch (type) {
		case 'updateSite':
			return {...state, [payload.prop]: payload.value};
		case 'updateCompany':
			return {...state, company: {...state.company, [payload.prop] : payload.value}};
		case 'updatePersonal':
			return {...state, personal: {...state.personal, [payload.prop] : payload.value}};
		case 'loadProjects':
			return {...state, projects: payload};
		case 'data':
			return {...state, ...payload};
		case 'sendDataFail':
			return {...state, error: payload};
		case 'getUserFail':
			return {...state, error: 'no user'};
		case 'userType':
			return {...state, type: payload}
		case 'siteReset':
			return INITIAL_STATE
		default:
			return state;
	}
}