import React from 'react';
import LoadingImage from '../images/loader.gif';

export const Loading = (props) => {
	return (
		<div style={{display: props.loaded ? 'none': 'auto'}} className="loadingDiv">
			<span>Loading...</span>
			<img alt='error' src={LoadingImage} />
		</div>
	)
}