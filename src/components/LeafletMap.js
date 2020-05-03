import React, { Component } from "react";
import {
	Map,
	TileLayer,
	Marker,
	CircleMarker,
	Popup
} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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

	addMarker = (e) => {
		const { markers } = this.state
		markers.push(e.latlng)
		this.setState({ markers })
		console.log(this.state.markers)
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
		) 
		// this.setState(prevState => {
		//   const markers = [...prevState.markers];
		//   markers[markerIndex] = latLng;
		//   return { markers: markers };
		// });
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
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
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
								<span>Popup</span>
							</Popup>
						</Marker>
					)}
				</Map>
			</div>
		);
	}
}

export default LeafletMap;
