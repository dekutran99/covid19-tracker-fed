import React from "react";

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

import MarkerCard from './MarkerCard';

const { BaseLayer, Overlay } = LayersControl

class LeafletMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			default: {
				lat: 49.2827,
				lng: -123.1207,
				zoom: 12,
			},
			logs: [],
		};
	}

	async componentDidMount() {
		
		/********************************************************************************
			Load users log 
		********************************************************************************/

		// let url = "http://127.0.0.1:8000/"
		let url = "https://apic19gt.tranquanghuy.me/"
		let path = "logs/log/"

		let myHeaders = new Headers();

		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
			credentials: 'include',
		};

		await fetch(url + path, requestOptions)
			.then(response => response.json())
			.then(result => {
				for (let i = 0; i < result.length; i++) {
					result[i].latitude = parseFloat(result[i].latitude);
					result[i].longitude = parseFloat(result[i].longitude);
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
		};
		logs.push(log);
		this.setState(
			{
				logs: logs
			}
		);
	}

	handleMapClick = (e) => {
		if (e.type === 'click') {
		} else if (e.type === 'contextmenu') {
			this.addMarker(e);
		}
	}

	updateMarker = (e) => {
		let logIdx = e.target.options.markerIndex;
		let logs = this.state.logs;
		let log = logs[logIdx];
		let latlng = e.target.getLatLng();
		log.latitude = latlng.lat
		log.longitude = latlng.lng;
		logs.push(log);
		this.setState(
			{
				logs: logs
			}
		)
	};

	render() {
		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png')
		});

		return (
			<div style={{ paddingTop: "40px" }}>
				<Map
					center={[this.state.default.lat, this.state.default.lng]}
					zoom={this.state.default.zoom}
					style={{ height: '95vh', zIndex: 0 }}
					onClick={this.handleMapClick}
					oncontextmenu={this.handleMapClick}
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
