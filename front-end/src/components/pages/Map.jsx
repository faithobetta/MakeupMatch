/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../CSS-pages/map.css";
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  height: "250px",
  margin: "20px",
  // padding:"20px"

};


function Map({ latitude, longitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY // Replace with your API key
  });

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Store user's location
  const [selectedLocation, setSelectedLocation] = useState(null); // Store selected location

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error fetching location");
        }
      );
    }
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Function to handle map clicks
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
  };

  return isLoaded ? (
    <div className="map-container">
      <GoogleMap 
        mapContainerStyle={containerStyle}
        center={{ lat: latitude, lng: longitude }} // Center on provided latitude and longitude
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick} // Add click handler
      >
        {userLocation && <Marker position={{ lat: latitude, lng: longitude }}  label="" />}
      
        {selectedLocation && <Marker position={selectedLocation} label="Selected location" />}
  
        <Marker position={{ lat: latitude, lng: longitude }} label="Artist's Location" />
      </GoogleMap>
    </div>

  ) : <></>;
}

export default Map;
