const INITIAL_STATE = {
	name: undefined,
	contents: undefined,
	error: undefined,
	blogs: undefined,
	blogId: undefined
}

export default (state=INITIAL_STATE, action)=> {
	const {type, payload} = action;
	switch (type) {
		case 'editSuccess':
			return {...state, name: undefined, contents: undefined, error: undefined, blogId: undefined};
		case 'editFail':
			return {...state, error: payload};
		case 'newSuccess':
			return {...state, name: undefined, contents: undefined, error: undefined, blogId: undefined};
		case 'newFail': 
			return {...state, error: payload};
		case 'blogReturn': 
			return {...state, blogs: payload};
		case 'blogReturnFail': 
			return {...state, error: payload};
		default:
			return state;
	}
} 