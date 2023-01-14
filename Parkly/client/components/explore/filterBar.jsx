import { useEffect, useState } from 'react';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { states, designations, activities } from '../../../utils/shared.js';
import { MenuProps } from '../../../styles.js';

function FilterBar(props) {

  function handleFilterChange(e) {
    const value = e.target.value;
    props.setFilters({
      ...props.filters,
      [e.target.name]: value
    });
  }

  return (
    <>
      <FormControl size="small" sx={{ m: 2, width: 300 }} >
        <InputLabel id="designationLabel">Park Designation</InputLabel>
        <Select
          labelId="designationLabel"
          id="designationCheckbox"
          name="designation"
          multiple
          value={props.filters.designation}
          onChange={handleFilterChange}
          input={<OutlinedInput label="Park Designation" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {designations.map((designation) => (
            <MenuItem key={designation} value={designation} sx={{ maxHeight: 40 }} >
              <Checkbox checked={props.filters.designation.indexOf(designation) > -1} />
              <ListItemText primary={designation} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 2, width: 300 }} >
        <InputLabel id="activitiesLabel">Activities</InputLabel>
        <Select
          labelId="activitiesLabel"
          id="activitiesCheckbox"
          name="activities"
          multiple
          value={props.filters.activities}
          onChange={handleFilterChange}
          input={<OutlinedInput label="Activities" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {activities.map((activity) => (
            <MenuItem key={activity} value={activity} sx={{ maxHeight: 40 }}>
              <Checkbox checked={props.filters.activities.indexOf(activity) > -1} />
              <ListItemText primary={activity} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 2, minWidth: "150px" }}>
        <InputLabel id="statesLabel">States</InputLabel>
        <Select
          labelId="statesLabel"
          id="statesCheckbox"
          name="states"
          multiple
          value={props.filters.states}
          onChange={handleFilterChange}
          input={<OutlinedInput label="States" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {states.map((state) => (
            <MenuItem key={state} value={state} sx={{ maxHeight: 40 }}>
              <Checkbox checked={props.filters.states.indexOf(state) > -1} />
              <ListItemText primary={state} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, width: 150 }} >
        <TextField
          size="small"
          id="outlined-basic"
          label="Distance"
          variant="outlined"
          name="miles"
          onChange={handleFilterChange}
        />
      </FormControl>
      <FormControl size="small">
        <Button
          size="small"
          style={{ margin: 15, width: 100, height: 40}}
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            console.log(props.filters);
            props.getParks(JSON.stringify(props.filters));
          }}>
          Apply
        </Button>
      </FormControl>
    </>
  )
};

export default FilterBar;