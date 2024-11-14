import React, {Component} from 'react';
import {submitTutor, getSkillData} from '../actions';
import {Modal} from './common'
import {connect} from 'react-redux';

const mapStateToProps = state => {
	const {
		genres,
		subjects,
		requested,
	} = state.site;
	return {
		genres,
		subjects,
		requested,
	};
}

export default connect(mapStateToProps, {submitTutor, getSkillData})(class TutorModal extends Component {

	genreButtons = () => this.props.genres.map( (genre, index) => <button key = {'genreButton'+index} className={'button' + (genre.active ? ' selected' : ' unselected')} onClick={this.props.toggleGenre(genre.skills)}>{genre.name}</button>)

	specificsBox = () => {
		this.props.requested.map( (skill, index) => {
			const retval = <button key={'skillButton' + index} className={'button' + (skill.active ? ' selected' : ' unselected')} onClick={this.props.toggleSkill(index)}>{skill.name}</button>
			return index % 10 === 0 ? retval + <br /> : retval;
		});
	}

	render() {
		if (!this.props.visible)
			return null;
		return (
			<Modal>
				<span>What would you like to learn?</span>
				<div id="genreBox">
					{this.genreButtons()}
				</div>
				<div id="specificsBox">
					{this.specificsBox()}
				</div>
				<div id="studyingBox">
					{this.studyingBox()}
				</div>
				<button onClick={() => this.props.submitTutor(this.props.selected)}>Submit Request</button>
				<button onClick={this.props.closeModal}>No</button>
			</Modal>
		)
	}
});