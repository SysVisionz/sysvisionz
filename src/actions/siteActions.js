export const dropdownOpen = (id, value) => {
	return {
		type: 'dropdownOpen',
		payload: {id, value}
	}
}

export const dropdownStatus = () => {
	return {
		type: 'dropCheck'
	}
}

export const newImage = () => {
	return {
		type: 'newImage'
	}
}

