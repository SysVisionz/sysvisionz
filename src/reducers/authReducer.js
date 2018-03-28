const INITIAL_STATE = {
	user: null,
	username: null,
	password: null,
	error: false
}

export default (state = INITIAL_STATE, action ) => {
	const {type, payload} = action;
	switch (type) {
		case 'login':
			return {user: payload};
		case 'logout':
			return {state: INITIAL_STATE};
		case 'changeVar':
			return {[payload.var]: payload.value};
		case 'loginFail':
			return {error: 'Invalid username or password.'}
		default:
			return state;
	}
}