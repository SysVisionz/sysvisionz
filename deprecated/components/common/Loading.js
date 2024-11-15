import React from 'react';
import LoadingImage from '../../images/loader.gif';

export const Loading = (props) => {
	return (
		<div hidden={props.hidden} className={props.className}>
			<div>Loading...</div>
			<img alt='error' src={LoadingImage} />
		</div>
	)
}