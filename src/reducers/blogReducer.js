const INITIAL_STATE = {
	error: undefined,
	blogList: [],
	_id: undefined,
	title: undefined,
	content: undefined,
	createdAt: undefined,
	editedAt: undefined,
	_creator: undefined,
	editingContent: '',
	editingTitle: ''
}

export default (state=INITIAL_STATE, action)=> {
	const {type, payload} = action;
	switch (type) {
		case 'changeBlog':
			return {...state, [payload.prop]: payload.value}
		case 'editSuccess':
			return {...state, name: undefined, contents: undefined, error: undefined, blogId: undefined};
		case 'editFail':
			return {...state, error: payload};
		case 'newSuccess':
			return {...state, name: undefined, contents: undefined, error: undefined, blogId: undefined};
		case 'newFail': 
			return {...state, error: payload};
		case 'blogList': 
			return {...state, blogList: payload};
		case 'blogReturnFail': 
			return {...state, error: payload};
		case 'blog':
			return {...state, currentBlog: payload};
		default:
			return state;
	}
} 