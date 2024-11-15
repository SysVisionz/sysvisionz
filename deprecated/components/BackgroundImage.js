import React from 'react'

export const BackgroundImage = (props) => {
	return (
		<div id="bg-image" style={{top: props.fromTop}}> 
          <img alt='error' src={props.bgWires} onLoad={props.bgLoaded} />
          <img alt='error' src={props.bgWires} style={{transform: 'scaleY(-1)'}} />
        </div>
    )
}