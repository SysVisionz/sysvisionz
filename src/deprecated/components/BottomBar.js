import React from 'react'

export const BottomBar = (props) => {
	return (
		<div id="bottomBar" className="stretch" style={props.style}>
			<div className='dropButton' onClick={() => props.returnToTop(true)}>Back To Top</div>
		</div>
	)
}