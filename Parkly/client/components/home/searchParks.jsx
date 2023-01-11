import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchParks(props) {

  // State
  const [parkNames, setParkNames] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');

  // Functions
  useEffect(() => {
    console.log('sending request for names');
    axios.get(`http://localhost:3000/parkNames`)
      .catch((err) => {
        console.log('error getting park names:', err);
      })
      .then((results) => {
        setParkNames(results.data);
      })
  }, []);

  // Navigation
  const navigate = useNavigate();

  function navToPark() {
    navigate('/park');
  }

  return (
    <div>
      <Autocomplete
        style={{ width: 500 }}
        options={parkNames}
        getOptionLabel={(option) => option.fullName || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Park Name"/>}
        value={searchEntry}
        onChange={(e, newValue, reason) => {
          if (reason === 'clear') {
            props.setSelectedParkId('')
            return
          } else {
            props.setSelectedParkId(newValue._id);
          }
        }}
      />
      <Button
        style={{ width: 100 }}
        variant="contained"
        onClick={(e) => {
          if (props.selectedParkId) {
            navToPark();
          } else {
            // handle park not selected!
            console.log('please select a park, or visit explore')
          }
        }}
      >
        Go!
      </Button>
    </div>
  )
};

export default SearchParks;