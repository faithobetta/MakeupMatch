/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '400px',
  margin: "20px"
};

function Map({ latitude, longitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCXF6BlbNZbDMI715io9A-fjb92VgDZaNU" // Replace with your API key
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }} // Center on provided latitude and longitude
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick} // Add click handler
    >
      {/* Marker for the user's current location */}
      {userLocation && <Marker position={{ lat: latitude, lng: longitude }}  label="" />}
      
      {/* Marker for the selected location */}
      {selectedLocation && <Marker position={selectedLocation} label="Selected location" />}
      
      {/* Marker for the artist's location */}
      <Marker position={{ lat: latitude, lng: longitude }} label="Artist's Location" />
    </GoogleMap>
  ) : <></>;
}

export default Map;
