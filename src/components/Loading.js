import React from 'react';
import LoadingImage from '../images/loader.gif';

export const Loading = (props) => {
	return (
		<div className={props.className}>
			<span>Loading...</span>
			<img alt='error' src={LoadingImage} />
		</div>
	)
}