import React from 'react'

export const Attention = (props) => {
	return (
		<div className="attention-wrapper">
			<div>{props.children}</div>
			<div style={{position: 'relative'}}>
				<div hidden={!props.on} className="attention-jumper">!</div>
			</div>
		</div>
	)
}