import React, { Component } from "react";
import {
	Map,
	TileLayer,
	Marker,
	Popup,
	LayersControl,
	LayerGroup,
} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MarkerCard from './MarkerCard';

const { BaseLayer, Overlay } = LayersControl

class LeafletMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			default: {
				lat: 49.2827,
				lng: -123.1207,
				zoom: 12,
			},
			logs: [],
			positions: []

		}
	}

	componentDidMount() {

		// let url = "http://127.0.0.1:8000/"
		let url = "https://covid-19-tracker-276100.wl.r.appspot.com/"
		let path = "logs/log/"

		let myHeaders = new Headers();

		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
			credentials: 'include',
		};

		fetch(url + path, requestOptions)
			.then(response => response.json())
			.then(result => {
				for (let i = 0; i < result.length; i++) {
					result[i].latitude = parseFloat(result[i].latitude);
					result[i].longitude = parseFloat(result[i].longitude);
					result[i].log_start = result[i].log_start.substring(0, result[i].log_start.length - 1)
					result[i].log_end = result[i].log_end.substring(0, result[i].log_end.length - 1)
					let logs = this.state.logs;
					logs.push(result[i]);
					this.setState(
						{
							logs: logs
						}
					);
				}
			})
			.catch(error => console.log('error', error));
	}

	addMarker = (e) => {
		let logs = this.state.logs;
		let log = {
			latitude: e.latlng.lat,
			longitude: e.latlng.lng,
			log_start: '2020-01-01T00:00',
			log_end: '2020-01-01T00:00'
		}
		logs.push(log);
		this.setState(
			{
				logs: logs
			}
		)
	}

	updateMarker = (e) => {
	};

	render() {
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		return (
			<div className='pt-5'>
				<Map
					center={[this.state.default.lat, this.state.default.lng]}
					zoom={this.state.default.zoom}
					style={{ height: '95vh', zIndex: 0 }}
					onClick={this.addMarker}
				>
					<LayersControl>
						<BaseLayer checked name="Map">
							<LayerGroup>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
								/>
							</LayerGroup>
						</BaseLayer>
						<Overlay checked name="Markers">
							<LayerGroup>
								{this.state.logs.map((log, idx) =>
									<Marker
										key={`marker-${idx}`}
										markerIndex={idx}
										position={
											[log.latitude, log.longitude]
										}
										draggable={true}
										onDragend={this.updateMarker}
									>
										<Popup>
											<span>
												<MarkerCard log={log} />
											</span>
										</Popup>
									</Marker>
								)}
							</LayerGroup>
						</Overlay>
					</LayersControl>
				</Map>
			</div>
		);
	}
}


export default LeafletMap;
