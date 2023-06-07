import React, {useState} from 'react';
import axios from 'axios';

const LocationInput = ({setLocation, location, submitLocation, addLocation, toggleRain, toggleSnow, changeSnow, snowText, nukeServer, nukeText, normalSnow, isRainingText, isSnowingText}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setLocation(e.target.value);
  }

  return (
    <div>
      <div className='title'>Depressed Weather App</div>
      <br></br>
      <input onChange={handleChange} placeholder='Please enter location'/>
      <button onClick={() => submitLocation(location)}>Bring me weather</button>
      <button onClick={() => addLocation()}>Save Location</button>
      <button onClick={() => toggleRain()}>{isRainingText}</button>
      <button onClick={() => toggleSnow()}>{isSnowingText}</button>
      <button onClick={() => changeSnow()}>{snowText}</button>
      <button onClick={() => normalSnow()}>Normal Snow</button>
      <button className='nukeButton' onClick={() => nukeServer()}>{nukeText}</button>
    </div>
  )
}

export default LocationInput;