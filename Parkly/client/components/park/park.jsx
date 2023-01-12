import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios';
import Map from '../explore/map';

function Park(props) {

  // State
  const [selectedParkData, setSelectedParkData] = useState(null);
  const [parkActivities, setParkActivities] = useState(null);

  // Functions
  useEffect(() => {
    getParkData();
  }, []);

  useEffect(() => {
    // axios.get(``)
  }, []);

  const navigate = useNavigate();
  function navToHome() {
    navigate('/');
  };

  function getParkData() {
    if (!props.selectedParkId) {
      navToHome();
    } else {
      axios.get(`http://localhost:3000/park/${props.selectedParkId}`)
      .catch((err) => {
        console.log('error retrieving park data:', err);
      })
      .then((results) => {
        setSelectedParkData(results.data);
      })
    }
  };

  function normalizePhone(str) {
    let norm = str.split('').filter(x => Number.isInteger(parseInt(x))).join('');
    return `(${norm.slice(0,3)}) ${norm.slice(3, 6)}-${norm.slice(6)}`;
  }

  function saveAndUpdatePark() {
    props.savePark(selectedParkData._id, !selectedParkData.saved).then(() => getParkData());
  }

  return (
    selectedParkData &&
      <div id="parkPageContainer">
        <div id="parkBannerContainer">
          {selectedParkData.saved
          ? <FaHeart
              className="saveParkIcon-parkPage"
              color="white"
              onClick={saveAndUpdatePark}
            />
          : <FaRegHeart
              className="saveParkIcon-parkPage"
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
          <h2>Find your next adventure</h2>
          <div id="parkDescriptionContainer">
            <p>{selectedParkData.description}</p>
          </div>
          <div id="parkMapContainer">
              <Map
                parkData={[selectedParkData]}
                containerStyle = {{ width: '100%', height: '100%' }}
                coords={{ lat: parseFloat(selectedParkData.latitude), lng: parseFloat(selectedParkData.longitude) }}
                zoom={11}
              />
          </div>
          <h2>Activites & Experiences</h2>



          <h2>Photo gallery</h2>
          <div className="parkPhotoGallery">
            {selectedParkData.images.map((image) => (
              <img
                className="parkPhotoGalleryImage"
                key={image._id}
                src={image.url}
                alt={image.altText}
                onError={(e) => {
                    e.target.style.display = 'none'
                }}
              />
            ))}
          </div>
          <h2>Park Information</h2>
          <div id="parkInfoContainer">
            <div className="accordionContainer">
              <Accordion>
                <AccordionSummary
                  id="parkInfoPanel-header"
                  aria-controls="parkInfoPanel-content"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Address & Phone</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {selectedParkData.addresses.filter(address => address.type === 'Physical').map((address, index) => (
                    <div className="parkAddress" key={index}>
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>{address.city}, {address.stateCode} {address.postalCode}</p>
                    </div>
                  ))}
                  {selectedParkData.contacts.phoneNumbers.filter(phone => phone.type === 'Voice').map((phone, index) => (
                    <div className="parkPhone" key={index}>
                      <p>{normalizePhone(phone.phoneNumber)}</p>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  id="entranceFeePanel-header"
                  aria-controls="entranceFeePanel-content"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Park Hours</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {selectedParkData.operatingHours.map((hours) => (
                    <div className="parkHoursItem" key={hours.name}>
                      <p>{hours.name}</p>
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
                  id="entranceFeePanel-header"
                  aria-controls="entranceFeePanel-content"
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Entrance Fees & Passes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedParkData.entranceFees.map((entranceFee) => (
                      <div key={entranceFee.title}>
                        <p><b>{entranceFee.title}</b> - ${entranceFee.cost}</p>
                        <p>{entranceFee.description}</p>
                      </div>
                    ))}
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
                  id='weatherPanel-header'
                  aria-controls='weatherPanel-content'
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>Weather Info</Typography>
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



            {/* <div className="activitiesContainer">
              {selectedParkData.activities.map((activity) => (
                <Chip sx={{ m: 0.5, color: "white", backgroundColor: "#2C5602" }}label={activity.name} variant="outlined" key={activity.id}/>
              ))}
            </div> */}