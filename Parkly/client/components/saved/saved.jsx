import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ParkTile from '../explore/parkTile';

function Saved(props) {

  useEffect(() => {
    getSavedParks();
  }, [])

  function getSavedParks() {
    let filter = { saved: true };
    props.getParks(JSON.stringify(filter));
  }

  return (
    <div id="savedPageContainer">
      <h1 id="savedParksHeader">Places you love:</h1>
      <div id="savedParksContainer">
        {props.parkData && props.parkData.map((park) => (
          <ParkTile
            key={park._id}
            parkData={park}
            savePark={props.savePark}
            filter={{saved: true}}
            setSelectedParkId={props.setSelectedParkId}
            userLocation={props.userLocation}
          />
        ))}
      </div>
    </div>
  )
}

export default Saved;