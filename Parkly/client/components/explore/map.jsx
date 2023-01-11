import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import dotenv from 'dotenv';

function Map(props) {

  // State
  const [showParkDetails, setShowParkDetails] = useState(null);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={props.containerStyle}
        center={props.coords || {
          lat: 39.591111,
          lng: -97.398923
        }}
        zoom={props.zoom || 4}
      >
        {props.parkData.map((park) => (
          <Marker
            key={park._id}
            position={{ lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) }}
            onClick={() => {
              setShowParkDetails(park);
            }}
          />
        ))}
        {showParkDetails && (
          <InfoWindow
            position={{ lat: parseFloat(showParkDetails.latitude), lng: parseFloat(showParkDetails.longitude) }}
            onCloseClick={() => {setShowParkDetails(null)}}
          >
            <div>{showParkDetails.fullName}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
};

export default React.memo(Map);