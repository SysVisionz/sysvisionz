import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {TransitionGroup} from 'react-transition-group';
import {Scrollbars} from 'react-custom-scrollbars';
import {
	Update,
	Home, 
	Sysvisionz, 
	Page, 
	MakeApp, 
	Tutor,
	Invoices, 
	Projects, 
	NewProject, 
	Details, 
	Settings,
	Contact,
	BottomBar,
} from './';

export const MainApp = withRouter((props) => {
	const subProps = {xSmall: props.xSmall, topBar: props.topBar}
	const paths = [
		{
			key: 'home',
			path: '/',
			exact: true,
			component: <Home {...subProps} />,
		},
		{
			key: 'aboutSVZ',
			path: '/about/sysvisionz',
			component: <Sysvisionz {...subProps} />
		},
		{
			key: 'buildPage',
			path: '/service/page',
			component: <Page {...subProps} />
		},
		{
			key: 'buildApp',
			path: '/service/app',
			component: <MakeApp {...subProps} />,
		},
		{
			key: 'buildUpdate',
			path: '/service/update',
			component: <Update {...subProps} />,
		},
		{
			key: 'tutor',
			path: '/service/tutor',
			component: <Tutor {...subProps} />,
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
		<TransitionGroup>
			{paths.map((i) => {
			const {key, path, component, exact} = i;
			return (
					<Route key={key} exact={exact} path={path} render={() => component} />
		)})}
		</TransitionGroup>
	);
	const mainClass = props.xSmall ? props.className + ' xSmall' : props.className;
	const mainWidth = props.xSmall
		? window.innerWidth-150
		: props.topBar ? window.innerWidth-175 : window.innerWidth-250;
	return (
		<Scrollbars className={mainClass} style={{width: mainWidth }}>
			{routes}
			<BottomBar {...subProps} style={{width: mainWidth}} />
		</Scrollbars>
	)
});