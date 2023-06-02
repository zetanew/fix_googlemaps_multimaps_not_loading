import React, { useEffect } from 'react';

const NewMap = () => {
  useEffect(() => {
    const cleanup = () => {
      const scripts = document.getElementsByTagName('script');
      const googleMapsScript = Array.from(scripts).find(script =>
        script.src.includes('maps.googleapis.com/maps/api/js')
      );
      if (googleMapsScript) {
        googleMapsScript.parentNode.removeChild(googleMapsScript);
      }
    };

    cleanup(); // Clean up existing Google Maps API script on component mount

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=visualization&callback=initMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = initializeMap; // Expose initializeMap globally

    return () => {
      document.body.removeChild(script);
      delete window.initMap; // Clean up globally exposed function
    };
  }, []);

  const initializeMap = () => {
    const containerStyle = {
      width: '400px',
      height: '400px'
    };

    const center = {
      lat: 39.7749, // latitude of the desired center point
      lng: 30.4194 // longitude of the desired center point
    };

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 10
    });

    // Additional map setup or markers can be added here
  };

  return <div id="map" style={{ width: '400px', height: '400px' }}></div>;
};

export default NewMap;
