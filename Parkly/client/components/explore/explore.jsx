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
    currentLoc: [],
    states: [],
    activities: [],
    designation: []
  });

  // Functions
  useEffect(() => {
    props.getParks(JSON.stringify({}));
  }, [])

  return (
    <div>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        getParks={props.getParks}
      />
      {props.parkData && (
        <div>
          <Map
            parkData={props.parkData}
            containerStyle = {{
              width: '800px',
              height: '800px'
            }}
          />
        </div>
      )}
      <div>
        {props.parkData && props.parkData.map((park) => (
          <ParkTile
            key={park._id}
            parkData={park}
            setSelectedParkId={props.setSelectedParkId}
            savePark={props.savePark}
          />
        ))}
      </div>
    </div>
  )
}

export default Explore;