import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import Home from './home/home.jsx';
import Explore from './explore/explore.jsx';
import Park from './park/park.jsx';
import Saved from './saved/saved.jsx';
import { theme } from '../../styles.js'

function App() {

  // State
  const [selectedParkId, setSelectedParkId] = useState('');
  const [parkData, setParkData] = useState([]);
  // const [userLocation, setUserLocation] = useState([-97.398923, 39.591111]);
  const [userLocation, setUserLocation] = useState(null);

  // Functions
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      setUserLocation([lon, lat]);
      console.log('setting user location');
    });
  }, []);


  function savePark(id, savedStatus, filter) {
    return axios.put(`http://localhost:3000/saved/${id}`, { saved: savedStatus })
    .then(() => {
      getParks(JSON.stringify(filter));
    })
  }

  function getParks(filters) {
    axios.get(`http://localhost:3000/parks`, { params: { filters } })
      .catch((err) => {
        console.log('error retrieving parks:', err);
      })
      .then((results) => {
        setParkData(results.data);
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Link to="/" id="logo" className="navItem">Parkly</Link>
          <nav>
            <ul id="navList">
              <Link to="/Explore" className="navItem">Explore</Link>
              <Link to="/Saved" className="navItem">Saved</Link>
            </ul>
          </nav>
        </header>
        <div id="main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selectedParkId={selectedParkId}
                  setSelectedParkId={setSelectedParkId}
                  parkData={parkData}
                  userLocation={userLocation}
                  getParks={getParks}
                  savePark={savePark}
                />
              }
            />

            <Route
              path="/Explore"
              element={
                <Explore
                  parkData={parkData}
                  getParks={getParks}
                  setSelectedParkId={setSelectedParkId}
                  savePark={savePark}
                  userLocation={userLocation}
                />
              }
            />

            <Route
              path="/Park"
              element={
                <Park
                  getParks={getParks}
                  selectedParkId={selectedParkId}
                  savePark={savePark}
                />
              }
            />

            <Route
              path="/Saved"
              element={
                <Saved
                  parkData={parkData}
                  getParks={getParks}
                  setSelectedParkId={setSelectedParkId}
                  savePark={savePark}
                  userLocation={userLocation}
                />
              }
            />
          </Routes>
        </div>
        <div id="footer">
          Copyright © Touch Grass, Ltd. All rights reserved.
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
