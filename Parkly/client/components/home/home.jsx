import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Carousel from "react-multi-carousel";
import distance from '../../../utils/utils.js';
import SearchParks from './searchParks';
import ParkTile from '../explore/parkTile';
import { popularParks, responsive } from '../../../utils/shared.js';

function Home(props) {

  // Navigation
  const navigate = useNavigate();

  // Functions
  useEffect(() => {
    props.getParks(JSON.stringify({}));
  }, [])

  function isClose(parkLat, parkLong) {
    let dist = Math.round(distance(props.userLocation[1], parseFloat(parkLat), props.userLocation[0], parseFloat(parkLong)));
    return dist < 200;
  }

  return (
    <div id="homePageContainer">
      <div id="bannerContainer">
        <h1 className="bannerText">Where will you go next?</h1>
        <img
          className="bannerPhoto"
          src="https://images.squarespace-cdn.com/content/v1/5e91fee3ef75447348045261/1600375376550-7UAMZ4JP9XSY3PHIXCRA/glacier-banner.jpg"
          alt="wide angle photo of national park"
        />
        <div id="searchContainer">
          <SearchParks
            selectedParkId={props.selectedParkId}
            setSelectedParkId={props.setSelectedParkId}
          />
          <Button
            color='primary'
            variant='contained'
            sx={{ width: '40%'}}
            onClick={() => {
              if (props.selectedParkId) navigate('/park');
              else navigate('/explore');
            }}
          >
            {props.selectedParkId ? 'Go!' : 'See all parks'}
          </Button>
        </div>
      </div>

      <h1 className="homeContainerLabel">Popular parks:</h1>
      {props.parkData &&
        <div className="homeParkTileContainer">
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"

          >
            {props.parkData.filter((park) => popularParks.includes(park.fullName)).map((park) => (
              <ParkTile
                key={park._id}
                parkData={park}
                setSelectedParkId={props.setSelectedParkId}
                savePark={props.savePark}
                filter={{}}
                userLocation={props.userLocation}
              />
            ))}
          </Carousel>
        </div>
      }

      <h1 className="homeContainerLabel">Parks near you:</h1>
      {props.userLocation &&
        <div className="homeParkTileContainer">
          <Carousel responsive={responsive} containerClass="carousel-container">
            {props.parkData.filter((park) => isClose(park.latitude, park.longitude)).map((park) => (
              <ParkTile
                key={park._id}
                parkData={park}
                setSelectedParkId={props.setSelectedParkId}
                savePark={props.savePark}
                filter={{}}
                userLocation={props.userLocation}
              />
            ))}
          </Carousel>
        </div>
      }
    </div>
  )
}

export default Home;
