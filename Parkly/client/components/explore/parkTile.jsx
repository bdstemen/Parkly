import React from 'react';
import { useNavigate } from 'react-router-dom';
import distance from '../../../utils/utils.js';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ParkTile(props) {

  const navigate = useNavigate();
  function navToPark() {
    navigate('/park');
  }

  function distanceStr() {
    let dist = Math.round(distance(props.userLocation[1], parseFloat(props.parkData.latitude), props.userLocation[0], parseFloat(props.parkData.longitude)));
    return `${dist} miles away`
  }

  return (
    <div
      className="tileContainer"
      onClick={(e) => {
        props.setSelectedParkId(props.parkData._id);
        navToPark();
      }}
    >
      <div className="tilePhotoContainer">
        <img
          className="tilePhoto"
          src={props.parkData.images[0].url}
          alt={props.parkData.images[0].altText}
        />
      </div>
      <div>
        <p className="tileName">
          {props.parkData.fullName}
        </p>
        <p>
          {props.parkData.addresses.filter(address => address.type === 'Physical').map((address) => (
            `${address.city}, ${address.stateCode}`
          ))}
        </p>
        {props.userLocation && <p>{distanceStr()}</p>}
      </div>
      {props.parkData.saved
      ? <FaHeart
          className="saveParkIcon"
          color="white"
          onClick={(e) => {
            e.stopPropagation();
            props.savePark(props.parkData._id, !props.parkData.saved, props.filter);
          }}
        />
      : <FaRegHeart
          className="saveParkIcon"
          color="white"
          onClick={(e) => {
            e.stopPropagation();
            props.savePark(props.parkData._id, !props.parkData.saved, props.filter);
          }}
        />}
    </div>
  )
};

export default ParkTile;