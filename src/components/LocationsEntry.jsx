import React from 'react';

const LocationsEntry = ({location, handleDelete, submitLocation}) => {
  return (
    <div className='entry'>
      <div className='individualEntry' onClick={() => submitLocation(location.location)}>
        {location.location}
      </div>
      <span className='nuke'>
        <button onClick={() => handleDelete(location.location)}>Delete me 👁 👄 👁</button>
      </span>
    </div>
  )
}

export default LocationsEntry;