const INITIAL_STATE = {
	user: undefined,
	username: undefined,
	password: undefined,
	error: false,
	newUser: false,
	loggingIn: false,
	userCheck: false
}

export default (state = INITIAL_STATE, action ) => {
	const {type, payload} = action;
	switch (type) {
		case 'login':
			return {...state, user: payload, loggingIn: false, userChecked: true, newUser: false};
		case 'logout':
			return {state: INITIAL_STATE};
		case 'updateValue':
			return {...state, [payload.prop]: payload.value};
		case 'noUser':
			return {...state, newUser: true, loggingIn: false};
		case 'loginFail':
			return {...state, error: 'Invalid username or password.', loggingIn: false};
		case 'closeModal':
			return {...state, newUser: false};
		case 'loggingIn':
			return {...state, loggingIn: true, error: false};
		default:
			return state;
	}
}