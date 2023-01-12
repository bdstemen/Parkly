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

  return (
    <div id="autocompleteContainer">
      <Autocomplete
        sx={{ width: "100%" }}
        options={parkNames}
        getOptionLabel={(option) => option.fullName || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params}
            placeholder="Search for a national park"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                height: "70px",
                legend: {
                  marginLeft: "30px"
                }
              },
              "& .MuiAutocomplete-inputRoot": {
                paddingLeft: "20px !important",
              },
              "& .MuiInputLabel-outlined": {
                paddingLeft: "20px",
              },
              "& .MuiInputLabel-shrink": {
                marginLeft: "20px",
                paddingLeft: "10px",
                paddingRight: 0,
              }
            }}
          />
        )}
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
    </div>
  )
};

export default SearchParks;