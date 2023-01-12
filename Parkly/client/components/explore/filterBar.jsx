import { useEffect, useState } from 'react';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "150px",
    },
  },
};

const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

const designations = ["National Park", "National Monument", "National Preserve", "National Historic Site", "National Historic Park", "National Memorial", "National Battlefield", "National Cemetary", "National Recreation Area", "National Seashore", "National Lakeshore", "National River", "National Parkway", "National Trail", "Affiliated Areas"];

const activities = ['Astronomy', 'Stargazing', 'Food', 'Picnicking', 'Guided Tours', 'Self-Guided Tours - Walking', 'Hands-On', 'Junior Ranger Program', 'Wildlife Watching', 'Birdwatching', 'Park Film', 'Museum Exhibits', 'Shopping', 'Bookstore and Park Store', 'Gift Shop and Souvenirs', 'Arts and Culture', 'Cultural Demonstrations', 'Biking', 'Boating', 'Camping', 'Group Camping', 'Climbing', 'Rock Climbing', 'Compass and GPS', 'Geocaching', 'Fishing', 'Freshwater Fishing', 'Fly Fishing', 'Saltwater Fishing', 'Bus/Shuttle Guided Tour', 'Boat Tour', 'Citizen Science', 'Hiking', 'Front-Country Hiking', 'Horse Trekking', 'Horseback Riding', 'Ice Skating', 'Paddling', 'Canoeing', 'Kayaking', 'Stand Up Paddleboarding', 'Skiing', 'Cross-Country Skiing', 'Snow Play', 'Snowmobiling', 'Snowshoeing', 'Swimming', 'Freshwater Swimming', 'Saltwater Swimming', 'Living History', 'First Person Interpretation', 'Auto and ATV', 'Scenic Driving', 'Mountain Biking', 'Road Biking', 'Motorized Boating', 'Sailing', 'Canoe or Kayak Camping', 'Car or Front Country Camping', 'RV Camping', 'Orienteering', 'Self-Guided Tours - Auto', 'Arts and Crafts', 'SCUBA Diving', 'Snorkeling', 'Surfing', 'Backcountry Camping', 'Hunting and Gathering', 'Hunting', 'Whitewater Rafting', 'Craft Demonstrations', 'Historic Weapons Demonstration', 'Theater', 'Jet Skiing', 'Water Skiing', 'Playground', 'Team Sports', 'Reenactments', 'Mountain Climbing', 'Flying', 'Backcountry Hiking', 'Volunteer Vacation', 'Canyoneering', 'Auto Off-Roading', 'Horse Camping (see also Horse/Stock Use)', 'Off-Trail Permitted Hiking', 'Horse Camping (see also camping)', 'Dining', 'Tubing', 'Snow Tubing', 'Dog Sledding', 'Fixed Wing Flying', 'Gathering and Foraging', 'ATV Off-Roading', 'Pool Swimming', 'Live Music', 'Caving', 'Golfing', 'River Tubing', 'Ice Climbing', 'Downhill Skiing', 'Helicopter Flying', 'Mini-Golfing', 'Planetarium'];

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
          style={{ margin: 15, width: 100, height: 40, backgroundColor: "#1A3300" }}
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