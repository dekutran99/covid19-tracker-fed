import React, { Component } from "react";
import LeafletMap from './components/LeafletMap.js';
import AppNavbar from './components/AppNavbar.js';



export default class App extends Component {
	render() {
		return (
			<>
				<AppNavbar />
				<LeafletMap />
			</>
		)
	}
}
