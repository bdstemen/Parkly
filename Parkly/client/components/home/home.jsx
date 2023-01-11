import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SearchParks from './searchParks';

function Home(props) {

  // Navigation
  const navigate = useNavigate();

  function navToExplore() {
    navigate('/explore');
  }

  return (
    <div>
      <SearchParks
        selectedParkId={props.selectedParkId}
        setSelectedParkId={props.setSelectedParkId}
      />
      <Button style={{ width: 500 }} variant="contained" onClick={navToExplore}>
        See All Parks
      </Button>
    </div>
  )
}

export default Home;