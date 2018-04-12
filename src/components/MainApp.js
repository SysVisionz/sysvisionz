import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {TransitionGroup} from 'react-transition-group';
import {
	Build,
	Tutor,
	Invoices, 
	NewProject, 
	Details, 
	Settings,
	Contact,
} from './';
import Home from './Home';
import Projects from './Projects';
import Profile from './Profile';

export const MainApp = withRouter((props) => {
	const subProps = {xSmall: props.xSmall, topBar: props.topBar, user: props.user, dimmer: props.dimmer, loaderCheck: props.loaderCheck}
	const paths = [
		{
			key: 'home',
			path: '/',
			exact: true,
			component: <Home {...subProps} />,
		},
		{
			key: 'build',
			path: '/build',
			component: <Build {...subProps} />
		},
		{
			key: 'tutor',
			path: '/tutor',
			component: <Tutor {...subProps} />,
		},
		{
			key: 'profile',
			path: '/account/profile',
			component: <Profile {...subProps} />
		},
		{
			key: 'invoice',
			path: '/account/invoices',
			component: <Invoices {...subProps} />,
		},
		{
			key: 'projects',
			path: '/account/projects',
			component: <Projects {...subProps} />,
		},
		{
			key: 'newProject',
			path: '/account/newProject',
			component: <NewProject {...subProps} />,
		},
		{
			key: 'details',
			path: '/account/details',
			component: <Details {...subProps} />,
		},
		{
			key: 'settings',
			path: '/account/settings',
			component: <Settings {...subProps} />,
		},
		{
			key: 'contact',
			path: '/contact',
			component: <Contact {...subProps} />,
		}
	];
	const routes = (
		<TransitionGroup className="mainBody">
			{paths.map((i) => {
			const {key, path, component, exact} = i;
			return (
					<Route key={key} exact={exact} path={path} render={() => component} />
		)})}
		</TransitionGroup>
	);
	let mainClass = (props.xSmall ? props.className + ' xSmall' : props.className).concat( props.dim ? ' dim': '');
	const mainWidth = props.xSmall
		? window.innerWidth-150
		: props.topBar ? window.innerWidth-175 : window.innerWidth-250;
	return (
		<div>
			<div className={mainClass} style={{width: mainWidth }}>
				{routes}
			</div>
		</div>
	)
});