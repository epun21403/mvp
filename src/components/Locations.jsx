import React from 'react';
import LocationsEntry from './LocationsEntry.jsx'

const Locations = ({savedLocations, handleDelete, submitLocation}) => {
  if (savedLocations.length !== 0) {
    return (
      <div className='savedLocationsArray'>
        <h2>Saved Locations</h2>
          {savedLocations.map((location, index) => (
            <LocationsEntry key={index} location={location} handleDelete={handleDelete} submitLocation={submitLocation}/>
        ))}
      </div>
    )
  } else {
    return (
      <div className='savedLocationsArray'>
        <h2>Saved Locations</h2>
        <div>Empty</div>
      </div>
    )
  }
}

export default Locations;