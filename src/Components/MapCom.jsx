import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapCom.css";
const MapCom = ({ place }) => {
  return (
    <div className="map-container">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://png.pngtree.com/png-vector/20210214/ourmid/pngtree-location-marker-png-image_2921053.jpg"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>{place}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapCom;
