import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class LeafletMap extends Component {
    constructor(props) {
		super(props);
		this.state = {
			lat: 49.2827,
			lng: -123.1207,
			zoom: 12,
		};
	}

	render() {
		const position = [this.state.lat, this.state.lng];
		return (
			<div className='pt-5'>
				<Map center={position} zoom={this.state.zoom} style={{height : '95vh', zIndex: 0}}>
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
					/>
					<Marker position={position}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
            			</Popup>
					</Marker>
				</Map>
			</div>
		);
	}
}

export default LeafletMap;
