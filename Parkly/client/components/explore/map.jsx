import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from '../../../mapStyle.js';
import dotenv from 'dotenv';
import { useNavigate } from 'react-router-dom';

function Map(props) {

  const [showParkDetails, setShowParkDetails] = useState(null);

  let nav = useNavigate();

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
        zoom={props.zoom || 7}
        options={{ gestureHandling: 'greedy', styles: mapStyles }}
      >
        {props.parkData.map((park) => (
          <Marker
            key={park._id}
            position={{ lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) }}
            onClick={() => {setShowParkDetails(park)}}
            icon={{ url: '../../../mapMarker.svg', scaledSize: { width: 20, height: 20} }}
          />
        ))}
        {showParkDetails && (
          <InfoWindow
            position={{ lat: parseFloat(showParkDetails.latitude), lng: parseFloat(showParkDetails.longitude) }}
            onCloseClick={() => {setShowParkDetails(null)}}
          >
            <div>
              <p
                className="infoWindowTitle"
                onClick={(() => {
                  props.setSelectedParkId(showParkDetails._id);
                  nav('/Park');
                })}
              >
                {showParkDetails.fullName}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
};

export default React.memo(Map);