import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {TransitionGroup} from 'react-transition-group';
import {
	Build,
	Tutor,
	Invoices, 
	NewProject, 
	Details, 
	Contact,
	Home
} from './';
import GetBlog from './GetBlog'
import Blog from './Blog';
import Projects from './Projects';
import Profile from './Profile';

export const MainApp = withRouter((props) => {
	const subProps = {returnToTop: props.returnToTop, user: props.user, itemLoaded: props.itemLoaded};
	const paths = [
		{
			key: 'home',
			path: '/',
			exact: true,
			component: <Home {...subProps} name={props.name} />,
		},
		{
			key: 'blog',
			path: '/blog',
			exact: true,
			component: <Blog {...subProps} />,
		},
		{
			key: 'getBlog',
			path: '/blog/ref',
			component: <GetBlog {...subProps} search = {props.location.search} />
		},
		{
			key: 'build',
			path: '/build',
			component: <Build {...subProps}  />
		},
		{
			key: 'tutor',
			path: '/tutor',
			component: <Tutor {...subProps} recommendation={props.tutorRecommendation} isUp={props.isUp} clicked={props.clicked}  />,
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
			key: 'contact',
			path: '/contact',
			component: <Contact {...subProps} />,
		}
	];
	const routes = (
		<TransitionGroup id="main-section" className={props.dim ? ' dim' : ''}>
			{paths.map((i) => {
			const {key, path, component, exact} = i;
			return (
					<Route key={key} exact={exact} path={path} render={() => component} />
		)})}
		</TransitionGroup>
	);
	const {id, className}=props;
	return (
		<div id={id} className={className}>
			{routes}
		</div>
	)
});