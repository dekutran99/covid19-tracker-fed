import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import "bootstrap/dist/css/bootstrap.min.css";
import * as firebase from 'firebase';

import * as serviceWorker from './serviceWorker';
import App from './App';


// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDM3vNoIXP4kemAHZ7JRHeuZO_8wT0Zj7Q",
	authDomain: "covid-19-tracker-276100.firebaseapp.com",
	databaseURL: "https://covid-19-tracker-276100.firebaseio.com",
	projectId: "covid-19-tracker-276100",
	storageBucket: "covid-19-tracker-276100.appspot.com",
	messagingSenderId: "721853179393",
	appId: "1:721853179393:web:c10deeb855c55afeb3c200",
	measurementId: "G-4M9LESXCF9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
