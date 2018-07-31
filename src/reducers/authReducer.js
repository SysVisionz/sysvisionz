const INITIAL_STATE = {
	_id: undefined,
	email: undefined,
	password: undefined,
	displayName: undefined,
	type: undefined,
	personal:{
		greeting: '',
		name: '',
		street: '',
		city:'',
		state:'',
		zip: ''
	},
	company: undefined,
	contractSigned: undefined,
	website: undefined,
	error: false,
	newUser: false,
	loggingIn: false,
	userChecked: false,
	misc: undefined,
	persist: true,
	attentions: {
		projects: false,
		schedule: false,
		chat: false,
	},
	currentEdit: undefined
}

export default (state = INITIAL_STATE, action ) => {
	const {type, payload} = action;
	switch (type) {
		case 'promoteUserFail': 
			return {...state, error: payload }
		case 'userData': 
			return {...state, ...payload}
		case 'userDataFail':
			return {...state, error: payload}
		case 'promoteUserSuccess':
			return {...state, misc: `User ${payload} successfully promoted`}
		case 'login':
			return {...state, ...payload, loggingIn: false, userChecked: true, newUser: false};
		case 'logout':
			return {...INITIAL_STATE, userChecked: true, loggingIn: false};
		case 'updateValue':
			return {...state, [payload.prop]: payload.value};
		case 'noUser':
			return {...state, newUser: true};
		case 'loginFail':
			return {...state, error: 'Invalid username or password', loggingIn: false};
		case 'createUserFail':
			return {...state, error: payload}
		case 'closeModal':
			return {...state, newUser: false, loggingIn: false};
		case 'userNotIn':
			return {...state, userChecked: true};
		case 'loggingIn':
			return {...state, loggingIn: true, error: false};
		default:
			return {...state};
	}
}