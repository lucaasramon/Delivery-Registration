// MapModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

function MapModal({ isOpen, onRequestClose, startPoint, endPoint }) {
  const [directions, setDirections] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_GOOGLE_KEY;

      const startGeocode = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${startPoint}&key=${apiKey}`
      );
      const endGeocode = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${endPoint}&key=${apiKey}`
      );

      const startLocation = startGeocode.data.results[0].geometry.location;
      const endLocation = endGeocode.data.results[0].geometry.location;

      const directionsService = new window.google.maps.DirectionsService();
      const request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
        setIsLoaded(true);
      });
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, startPoint, endPoint]);

  const { isLoaded: mapIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD8-eB7KzYV8FfJWiElEr_a-3EQrYAVUEE",
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Map Modal"
      ariaHideApp={false}
      className="custom-modal"
    >
      <div className="map-container">
        {mapIsLoaded && (
          <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} zoom={10}>
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        )}
      </div>
    </Modal>
  );
}

export default MapModal;
