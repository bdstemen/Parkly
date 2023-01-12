import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ParkTile from '../explore/parkTile';

function Saved(props) {

  useEffect(() => {
    getSavedParks();
  }, [])

  function getSavedParks() {
    let filter = {
      saved: true
    };
    props.getParks(JSON.stringify(filter));
  }

  function updateSavedParks(id, savedStatus) {
    props.savePark(id, savedStatus).then(() => getSavedParks())
  }

  return (
    <div id="savedParksContainer">
      {props.parkData && props.parkData.map((park) => (
        <ParkTile
          key={park._id}
          parkData={park}
          savePark={updateSavedParks}
          setSelectedParkId={props.setSelectedParkId}
          userLocation={props.userLocation}
        />
      ))}
    </div>
  )
}

export default Saved;