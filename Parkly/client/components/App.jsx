import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './home/home.jsx';
import Explore from './explore/explore.jsx';
import Park from './park/park.jsx';
import Saved from './saved/saved.jsx';

function App() {

  // State
  const [selectedParkId, setSelectedParkId] = useState('');
  const [parkData, setParkData] = useState([]);

  // Functions
  function savePark(id, savedStatus) {
    axios.put(`http://localhost:3000/saved/${id}`, { saved: savedStatus });
  }

  function getParks(filters) {
    axios.get(`http://localhost:3000/parks`, {
      params: {
        filters
      }
    })
      .catch((err) => {
        console.log('error retrieving parks:', err);
      })
      .then((results) => {
        console.log('got data from server:', results.data);
        setParkData(results.data);
      })
  };

  return (
    <div className="App">
      <header>
        <h1>Parkly</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Explore">Explore</Link></li>
            <li><Link to="/Saved">Saved</Link></li>
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
              />
            }
          />
        </Routes>
      </div>
      <footer>
      </footer>
    </div>
  )
}

export default App
