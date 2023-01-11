import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Map from '../explore/map';

function Park(props) {

  // State
  const [selectedParkData, setSelectedParkData] = useState(null);

  // Functions
  const navigate = useNavigate();
  function navToHome() {
    navigate('/');
  }

  useEffect(() => {
    if (!props.selectedParkId) {
      // navigate back to home
      navToHome();
    } else {
      axios.get(`http://localhost:3000/park/${props.selectedParkId}`)
      .catch((err) => {
        console.log('error retrieving park data:', err);
      })
      .then((results) => {
        setSelectedParkData(results.data);
        console.log(results.data);
      })
    }
  }, [])

  function normalizePhone(str) {
    let norm = str.split('').filter(x => Number.isInteger(parseInt(x))).join('');
    return `(${norm.slice(0,3)}) ${norm.slice(3, 6)}-${norm.slice(6)}`;
  }

  return (
    selectedParkData &&
      <div>
        <div>
          <button
            onClick={(() => {props.savePark(selectedParkData._id, !selectedParkData.saved)})}
          >
            save
          </button>
          <img
            className="parkBannerPhoto"
            src={selectedParkData.images[0].url}
            alt={selectedParkData.images[0].altText}
          />
        </div>
        <div className="parkDescriptionContainer">
          <p>{selectedParkData.fullName}</p>
          <p>{selectedParkData.description}</p>
          <div className="activitiesContainer">
            {selectedParkData.activities.map((activity) => (
              <p key={activity.id}>{activity.name}</p>
            ))}
          </div>
        </div>
        <div className="parkPhotoGallery">
          {selectedParkData.images.map((image) => (
            <img
              className="parkPhotoGalleryImage"
              key={image._id}
              src={image.url}
              alt={image.altText}
            />
          ))}
        </div>
        <div className="parkInfoContainer">
          <h3>Address & Phone</h3>
          <div className="parkBasicInfoContainer">
            {selectedParkData.addresses.filter(address => address.type === 'Physical').map((address) => (
              <div className="parkAddress">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>{address.city}, {address.stateCode} {address.postalCode}</p>
              </div>
            ))}
            {selectedParkData.contacts.phoneNumbers.filter(phone => phone.type === 'Voice').map((phone) => (
              <div className="parkPhone">
                <p>{normalizePhone(phone.phoneNumber)}</p>
              </div>
            ))}
          </div>
          <h3>Hours</h3>
          <div className="parkHoursContainer">
            {selectedParkData.operatingHours.map((hours) => (
              <div className="parkHoursItem">
                <p>{hours.name}</p>
                <table>
                  <tr>
                    <td>Sunday</td>
                    <td>{hours.standardHours.sunday}</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>{hours.standardHours.monday}</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>{hours.standardHours.tuesday}</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>{hours.standardHours.wednesday}</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>{hours.standardHours.thursday}</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>{hours.standardHours.friday}</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>{hours.standardHours.saturday}</td>
                  </tr>
                </table>
                <p>{hours.description}</p>
              </div>
            ))}
          </div>
          <h3>Entrance Fees & Passes</h3>
          <div className="parkEntranceFeesContainer">
            {selectedParkData.entranceFees.map((entranceFee) => (
              <div>
                <p><b>{entranceFee.title}</b> - ${entranceFee.cost}</p>
                <p>{entranceFee.description}</p>
              </div>
            ))}
            {selectedParkData.entrancePasses.map((entrancePass) => (
              <div>
                <p><b>{entrancePass.title}</b> - ${entrancePass.cost}</p>
                <p>{entrancePass.description}</p>
              </div>
            ))}
          </div>
          <h3>Weather Info</h3>
          <div>
            <p>{selectedParkData.weatherInfo}</p>
          </div>
        </div>
        <div>
          <Map
            parkData={[selectedParkData]}
            containerStyle={{ height: '400px', width: '400px'}}
            coords={{ lat: parseFloat(selectedParkData.latitude), lng: parseFloat(selectedParkData.longitude) }}
            zoom={8}
          />
        </div>
      </div>
  )
}

export default Park;