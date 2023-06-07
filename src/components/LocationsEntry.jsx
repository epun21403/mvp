import React from 'react';

const LocationsEntry = ({location, handleDelete, submitLocation}) => {
  return (
    <div className='entry'>
      <div className='individualEntry' onClick={() => submitLocation(location.location)}>
        {location.location}
      </div>
      <div className='nuke'>
        <button onClick={() => handleDelete(location.location)}>Delete me</button>
      </div>
    </div>
  )
}

export default LocationsEntry;