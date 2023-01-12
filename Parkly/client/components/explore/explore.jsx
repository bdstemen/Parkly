import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import FilterBar from './filterBar';
import ParkTile from './parkTile';
import Map from './map';

function Explore(props) {

  // State
  const [filters, setFilters] = useState({
    miles: null,
    currentLoc: props.userLocation,
    states: [],
    activities: [],
    designation: []
  });

  // Functions
  useEffect(() => {
    props.getParks(JSON.stringify({}));
  }, [])

  function saveAndUpdateParks(id, savedStatus) {
    props.savePark(id, savedStatus).then(() => props.getParks(JSON.stringify(filters)));
  }

  return (
    <div>
      <div id="filterContainer">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          getParks={props.getParks}
        />
      </div>
      <div id="ExploreContainer">
        <div id="mapContainer">
          {props.parkData && (
            <Map
              parkData={props.parkData}
              coords={{
                lng: props.userLocation[0],
                lat: props.userLocation[1]
              }}
              containerStyle = {{
                width: '100%',
                height: '100%'
              }}
            />
          )}
        </div>
        <div id="parkListContainer">
          {props.parkData && props.parkData.map((park) => (
            <ParkTile
              key={park._id}
              parkData={park}
              setSelectedParkId={props.setSelectedParkId}
              savePark={saveAndUpdateParks}
              userLocation={props.userLocation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore;
