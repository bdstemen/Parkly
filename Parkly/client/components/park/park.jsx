import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import Carousel from "react-multi-carousel";
import axios from 'axios';
import dotenv from 'dotenv';
import Map from '../explore/map';
import ActivityTile from './activityTile';
import { responsive } from '../../../utils/shared.js';

function Park(props) {

  // State
  const [selectedParkData, setSelectedParkData] = useState(null);
  const [parkActivities, setParkActivities] = useState(null);

  // Functions
  const navigate = useNavigate();

  useEffect(() => {
    console.log('park ID:', props.selectedParkId);
    getParkData();
  }, []);

  function getParkData() {
    axios.get(`http://localhost:3000/park/${props.selectedParkId}`)
      .catch((err) => {
        console.log('error retrieving park data:', err);
        navigate('/');
      })
      .then((results) => {
        setSelectedParkData(results.data);
        return results.data.parkCode;
      })
      .then((parkCode) => {
        return axios.get(`https://developer.nps.gov/api/v1/thingstodo?api_key=${import.meta.env.VITE_NPS_API_KEY}&parkCode=${parkCode}`)
      })
      .catch((err) => {
        console.log('error retrieving activities data:', err);
      })
      .then((results) => {
        setParkActivities(results.data.data);
      })
  };

  function normalizePhone(str) {
    let norm = str.split('').filter(x => Number.isInteger(parseInt(x))).join('');
    return `(${norm.slice(0, 3)}) ${norm.slice(3, 6)}-${norm.slice(6)}`;
  }

  function saveAndUpdatePark() {
    props.savePark(selectedParkData._id, !selectedParkData.saved, {}).then(() => getParkData());
  }

  return (
    selectedParkData &&
    <div id="parkPageContainer">
      <div id="parkBannerContainer">
        {selectedParkData.saved
          ? <FaHeart
            className="saveParkIcon"
            color="white"
            onClick={saveAndUpdatePark}
          />
          : <FaRegHeart
            className="saveParkIcon"
            color="white"
            onClick={saveAndUpdatePark}
          />
        }
        <h1 className="bannerText">{selectedParkData.fullName}</h1>
        <img
          className="bannerPhoto"
          src={selectedParkData.images[0].url}
          alt={selectedParkData.images[0].altText}
        />
      </div>
      <div id="parkContentContainer">
        <div id="parkNavContainer">
          <span className="navItem"><a href="#parkDescriptionContainer">EXPLORE THE MAP</a></span>
          <span className="navItem"><a href="#parkActivitiesHeader">ACTIVITIES & EXPERIENCES</a></span>
          <span className="navItem"><a href="#parkPhotoGalleryHeader">PHOTO GALLERY</a></span>
          <span className="navItem"><a href="#parkInfoHeader">PARK INFORMATION</a></span>
        </div>
        <h2 id="parkDescriptionHeader">Find your next adventure</h2>
        <div id="parkDescriptionContainer">
          <p>{selectedParkData.description}</p>
        </div>
        <div id="parkMapContainer">
          <Map
            parkData={[selectedParkData]}
            containerStyle={{ width: '100%', height: '100%' }}
            coords={{ lat: parseFloat(selectedParkData.latitude), lng: parseFloat(selectedParkData.longitude) }}
            zoom={11}
          />
        </div>

        <h2 id="parkActivitiesHeader">Activites & Experiences</h2>
        {parkActivities && <div id="parkActivitiesContainer">
          <Carousel responsive={responsive} containerClass='carousel-container'>
            {parkActivities.map((activity) => (
              <ActivityTile
                key={activity.id}
                activity={activity}
              />
            ))}
          </Carousel>
        </div>}

        <h2 id="parkPhotoGalleryHeader">Photo gallery</h2>
        <div className="parkPhotoGallery">
          <Carousel responsive={responsive}>
            {selectedParkData.images.map((image, index) => (
              <div
                className="photoGalleryItem"
                key={index}
              >
                <div className="tilePhotoContainer">
                  <img
                    className="tilePhoto"
                    key={image._id}
                    src={image.url}
                    alt={image.altText}
                    onError={(e) => {
                      e.target.src = "https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg"
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <h2 id="parkInfoHeader">Park Information</h2>
        <div id="parkInfoContainer">
          <div className="accordionContainer">
            <Accordion>
              <AccordionSummary
                sx={{ color: 'white', backgroundColor: '#1A3300' }}
                id="parkInfoPanel-header"
                aria-controls="parkInfoPanel-content"
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              >
                <h3>Address & Phone</h3>
              </AccordionSummary>
              <AccordionDetails>
                <h4>Park Address:</h4>
                {selectedParkData.addresses.filter(address => address.type === 'Physical').map((address, index) => (
                  <div className="parkAddress" key={index}>
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>{address.city}, {address.stateCode} {address.postalCode}</p>
                  </div>
                ))}
                <h4>Park Phone Number:</h4>
                {selectedParkData.contacts.phoneNumbers.filter(phone => phone.type === 'Voice').map((phone, index) => (
                  <div className="parkPhone" key={index}>
                    <p>{normalizePhone(phone.phoneNumber)}</p>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{ color: 'white', backgroundColor: '#1A3300' }}
                id="parkHoursPanel-header"
                aria-controls="parkHoursPanel-content"
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              >
                <h3>Park Hours</h3>
              </AccordionSummary>
              <AccordionDetails>
                {selectedParkData.operatingHours.map((hours) => (
                  <div className="parkHoursItem" key={hours.name}>
                    <h4>{hours.name}</h4>
                    <table>
                      <tbody>
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
                      </tbody>
                    </table>
                    <p>{hours.description}</p>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{ color: 'white', backgroundColor: '#1A3300' }}
                id="entranceFeePanel-header"
                aria-controls="entranceFeePanel-content"
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              >
                <h3>Entrance Fees & Passes</h3>
              </AccordionSummary>
              <AccordionDetails>
                {selectedParkData.entranceFees.length && <h4>Entrance Fees:</h4>}
                {selectedParkData.entranceFees.map((entranceFee) => (
                  <div key={entranceFee.title}>
                    <p><b>{entranceFee.title}</b> - ${entranceFee.cost}</p>
                    <p>{entranceFee.description}</p>
                  </div>
                ))}
                {selectedParkData.entrancePasses.length && <h4>Entrance Passes:</h4>}
                {selectedParkData.entrancePasses.map((entrancePass) => (
                  <div key={entrancePass.title}>
                    <p><b>{entrancePass.title}</b> - ${entrancePass.cost}</p>
                    <p>{entrancePass.description}</p>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{ color: 'white', backgroundColor: '#1A3300' }}
                id='weatherPanel-header'
                aria-controls='weatherPanel-content'
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              >
                <h3>Weather Info</h3>
              </AccordionSummary>
              <AccordionDetails>
                {selectedParkData.weatherInfo}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Park;
