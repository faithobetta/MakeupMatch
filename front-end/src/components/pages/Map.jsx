
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '400px',
  margin: "20px"
};

function Map() {
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

    // Save to DB (implement your save function here)
    saveLocationToDb({ lat, lng });
  };

  // Example function to save location to DB
  const saveLocationToDb = async (location) => {
    try {
      // Replace with your API endpoint and method
      const response = await fetch('/api/save-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });
      const data = await response.json();
      console.log('Location saved:', data);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: 51.5074, lng: -0.1278 }} // Center on user location or default
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick} // Add click handler
    >
      {/* Marker for the user's current location */}
      {userLocation && <Marker position={userLocation} label="You are here" />}
      
      {/* Marker for the selected location */}
      {selectedLocation && <Marker position={selectedLocation} label="Selected location" />}
    </GoogleMap>
  ) : <></>;
}

export default Map;

