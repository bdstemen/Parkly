import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import distance from '../../../utils.js';
import SearchParks from './searchParks';
import ParkTile from '../explore/parkTile';

const popularParks = ["Grand Canyon National Park", "Rocky Mountain National Park", "Acadia National Park", "Grand Teton National Park", "Yosemite National Park", "Indiana Dunes National Park", "Glacier National Park"];

function Home(props) {

  // Navigation
  const navigate = useNavigate();

  function navToExplore() {
    navigate('/explore');
  }

  function navToPark() {
    navigate('/park');
  }

  // Functions

  useEffect(() => {
    props.getParks(JSON.stringify({}));
  }, [])

  function saveAndUpdateParks(id, savedStatus) {
    props.savePark(id, savedStatus).then(() => props.getParks(JSON.stringify({})))
  }

  function isClose(parkLat, parkLong) {
    let dist = Math.round(distance(props.userLocation[1], parseFloat(parkLat), props.userLocation[0], parseFloat(parkLong)));
    return dist < 200;
  }

  return (
    <div id="homePageContainer">
      <h1 className="bannerText">Where will you go?</h1>
      <img
        className="bannerPhoto"
        src="https://images.squarespace-cdn.com/content/v1/5e91fee3ef75447348045261/1600375376550-7UAMZ4JP9XSY3PHIXCRA/glacier-banner.jpg"
        alt="wide angle photo of national park"
      />
      <div id="homePageSearchContainer">
        <SearchParks
          selectedParkId={props.selectedParkId}
          setSelectedParkId={props.setSelectedParkId}
        />

        {props.selectedParkId
          ? <Button
              style={{ width: "42.5%", backgroundColor: "#1A3300" }}
              variant="contained"
              onClick={() => {
                navToPark();
              }}
            >
              Go!
            </Button>
          : <Button
              style={{ width: "42.5%", backgroundColor: "#1A3300" }}
              variant="contained"
              onClick={navToExplore}
            >
              See All Parks
            </Button>
          }
      </div>
      <h1 className="homeContainerLabel">Popular parks:</h1>
      {props.parkData &&
        <div className="homeParkTileContainer">
          {props.parkData.filter((park) => popularParks.includes(park.fullName)).map((park) => (
            <ParkTile
              key={park._id}
              parkData={park}
              setSelectedParkId={props.setSelectedParkId}
              savePark={saveAndUpdateParks}
              userLocation={props.userLocation}
            />
          ))}
        </div>
      }
      <h1 className="homeContainerLabel">Parks near you:</h1>
      {props.userLocation &&
        <div className="homeParkTileContainer">
          {props.parkData.filter((park) => isClose(park.latitude, park.longitude)).map((park) => (
            <ParkTile
              key={park._id}
              parkData={park}
              setSelectedParkId={props.setSelectedParkId}
              savePark={saveAndUpdateParks}
              userLocation={props.userLocation}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default Home;
