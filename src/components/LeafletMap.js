import React, { Component } from "react";
import {
	Map,
	TileLayer,
	Marker,
	Popup,
} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MarkerCard from './MarkerCard';

class LeafletMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			default: {
				lat: 49.2827,
				lng: -123.1207,
				zoom: 12,
			},
			markers: []

		}
	}

	componentDidMount() {
		let myHeaders = new Headers();

		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
			credentials: 'include',
		};

		fetch("https://covid-19-tracker-276100.wl.r.appspot.com/logs/log/", requestOptions)
			.then(response => response.json())
			.then(result => {
				for (let i = 0; i < result.length; i++) {
					const position = L.latLng({
						"lat": parseFloat(result[i]['latitude']),
						"lng": parseFloat(result[i]['longitude'])
					});
					const markers = this.state.markers;
					markers.push(position);
					this.setState(
						{
							markers: markers
						}
					);
					console.log(this.state.markers);
				}
			})
			.catch(error => console.log('error', error));
	}

	addMarker = (e) => {
		const markers = this.state.markers;
		markers.push(e.latlng);
		this.setState(
			{
				markers: markers
			}
		);
		console.log(this.state.markers);
	}

	updateMarker = (e) => {
		const latLng = e.target.getLatLng(); //get updated marker LatLng
		const markerIndex = e.target.options.markerIndex; //get marker index
		//update
		const markers = this.state.markers;
		markers[markerIndex] = latLng;
		this.setState(
			{
				markers: markers
			}
		);
		console.log(this.state.markers);
	};

	render() {
		const position = [this.state.default.lat, this.state.default.lng];
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		return (
			<div className='pt-5'>
				<Map
					center={position}
					zoom={this.state.default.zoom}
					style={{ height: '95vh', zIndex: 0 }}
					onClick={this.addMarker}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{this.state.markers.map((position, idx) =>
						<Marker
							key={`marker-${idx}`}
							markerIndex={idx}
							position={position}
							draggable={true}
							onDragend={this.updateMarker}
						>
							<Popup>
								<span>
									<MarkerCard position={position} />
								</span>
							</Popup>
						</Marker>
					)}
				</Map>
			</div>
		);
	}
}

export default LeafletMap;
