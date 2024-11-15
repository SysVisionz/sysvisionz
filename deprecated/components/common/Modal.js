import React from 'react'
import MenuButton from '../../images/MenuButton.png'

export const Modal = (props) => {
	if (props.open){
		return (
			<div id={props.id} className={props.className && props.className !== '' ? "modal "+props.className : 'modal'}>
				<div className="modalWindow">
					<div className="modal-close" onClick={props.closeModal}><img alt="close" src={MenuButton}/></div>
					{props.children}
				</div>
			</div>
		)
	}
	else {
		return null;
	}
}