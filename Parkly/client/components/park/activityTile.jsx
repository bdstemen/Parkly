import { useState } from 'react';

function ActivityTile(props) {

  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="tileContainer activityTileContainer"
      onClick={() => {
        setShowDescription(prevShowDescription => !prevShowDescription);
      }}>
      {showDescription
      ? <div className="activityTileInfo">
          <p className="tileName">{props.activity.title}</p>
          <p>{props.activity.shortDescription}</p>
        </div>
      : <><div className="tilePhotoContainer">
          <img
            className="tilePhoto"
            src={props.activity.images[0].url}
            alt={props.activity.images[0].altText}
            onError={(e) => {e.target.style.display = 'none'}}
          />
        </div>
        <div className="activityTileInfo">
          <p className="tileName">{props.activity.title}</p>
          {!!props.activity.isReservationRequired
            ? <p>Reservation required</p>
            : <p>No Reservation required</p>}
        </div></>
      }
    </div>
  )
}

export default ActivityTile;