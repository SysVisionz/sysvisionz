import React from 'react'

export const BlogEdit = (props) => {
	console.log(props);
	return (
		<form onSubmit = {props.onSubmit}>
			<div>
				<span>Title: </span>
				<input id="blog-title-box" type="text" onChange = {props.titleChange} value={props.titleValue} />
			</div>
			<div>
				<input id="blog-content-box" type="text" onChange = {props.contentChange} value={props.contentValue} />
			</div>
			<div>
				<input className="button" type="submit" value="Submit Blog" />
			</div>
		</form>
	)
}