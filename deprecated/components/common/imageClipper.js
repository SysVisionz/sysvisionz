import React from 'react'

export const imageClipper = (props) => {
	return (
		<div style={{overflow: 'hidden', width: props.width, height: props.height}}>
			<img alt={props.alt} src={props.image} style={{top: props.offset}} />
		</div>
	)
}