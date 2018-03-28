import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
		<Provider store={createStore(combineReducers, {}, applyMiddleware(ReduxThunk)) }>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
registerServiceWorker();
