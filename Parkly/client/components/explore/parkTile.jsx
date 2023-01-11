import React from 'react';
import { useNavigate } from 'react-router-dom'

function ParkTile(props) {

  // Functions
  const navigate = useNavigate();
  function navToPark() {
    navigate('/park');
  }

  return (
    <div>
      <img
        className="parkTilePhoto"
        src={props.parkData.images[0].url}
        alt={props.parkData.images[0].altText}
      />
      <p
        onClick={() => {
          props.setSelectedParkId(props.parkData._id);
          navToPark();
        }}
      >
        {props.parkData.fullName}
      </p>
      <p>{props.parkData.states.split(',').join(', ')}</p>
      <button onClick={() => props.savePark(props.parkData._id, !props.parkData.saved)}>
        Save
      </button>
    </div>
  )
};

export default ParkTile;