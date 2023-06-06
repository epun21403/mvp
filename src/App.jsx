import React, {useState, useEffect} from 'react';
import LocationInput from './components/LocationInput.jsx';
import Overview from './components/Overview.jsx';
import Locations from './components/Locations.jsx';
import axios from 'axios';
import  ObliqueRain  from  'react-rainfall-animation/src/ObliqueRain';
import Snowfall from 'react-snowfall';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [savedLocations, setSavedLocations] = useState([]);
  const [isRaining, setIsRaining] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);
  const [snowColor, setSnowColor] = useState('white');
  const [snowText, setSnowText] = useState('Sad Snow');
  const [nuke, setNuke] = useState(false);
  const [nukeText, setNukeText] = useState('Nuke Server');

  const getLocations = () => {
    axios.get('http://127.0.0.1:3000/mvp')
    .then((data) => {
      console.log(data.data)
      setSavedLocations(data.data);
    })
    .catch((err) => {
      console.log('Error getting locations!', err)
    })
  }

  useEffect(() => {
    getLocations()
  }, [])

  const submitLocation = (input) => {
    input = input.toString()
    axios.get(`http://127.0.0.1:3000/weather/${input}`, {
      params: {
        location: input
      }
    })
    .then((data) => {
      setWeatherData(data.data);
    })
    .catch((err) => {
      console.log('Error getting weather data ', err);
    })
  }

  const addLocation = () => {
    axios.post('http://127.0.0.1:3000/mvp', {
      location: `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`
    })
    .then(() => {
      console.log('Added location!')
      getLocations()
    })
    .catch((err) => {
      console.log('Error in adding location!' , err)
    })
  }

  const handleDelete = (clicked) => {
    axios.delete('http://127.0.0.1:3000/mvp', {
      data: {location: clicked}
    })
    .then(() => {
      console.log(`Deleted ${clicked}`)
      getLocations()
    })
    .catch((err)=> {
      console.log(`Error deleting location`)
    })
  }

  useEffect(() => {
    submitLocation
  }, [])

  const toggleRain = (e) => {
    setIsRaining(!isRaining);
  }

  const toggleSnow = (e) => {
    setIsSnowing(!isSnowing);
  }

  const changeSnow = (e) => {
    setSnowColor(
      snowColor === 'white' ? 'red' : 'white'
    );
    setSnowText(
      snowText === 'Sad Snow' ? 'Normal Snow' : 'Sad Snow'
    )
  }

  const nukeServer = () => {
    setNuke (!nuke)
    setNukeText(
      nukeText === 'Nuke Server' ? 'Rebuild Server' : 'Nuke Server'
    )
    alert('Are you sure you want to nuke server?' )
    alert('Last chance to abort.' )
  }

  if (isRaining === true) {
    return (
      <div className='app'>
        <div className="Rain">
          <ObliqueRain  dropletsAmount={200}  amplitude={400}  />
          <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} nukeText={nukeText}/>
          <br></br>
          <Overview weatherData={weatherData}/>
          <br></br>
          <Locations savedLocations={savedLocations} handleDelete={handleDelete} submitLocation={submitLocation}/>
        </div>
      </div>
    )
  } else if (isSnowing === true) {
    return (
      <div className='app'>
        <div className='snow'>
          <Snowfall snowflakeCount={300} color={snowColor}/>
        <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} nukeText={nukeText}/>
        <br></br>
        <Overview weatherData={weatherData}/>
        <br></br>
        <Locations savedLocations={savedLocations} handleDelete={handleDelete} submitLocation={submitLocation}/>
        </div>
      </div>
    )
  } else if (nuke === true ) {
    return(
      <div className='last'>
        👁 👄 👁
        {/* <button className='nukeButton' onClick={() => nukeServer()}>{nukeText}</button> */}
      </div>
    )
  } else {
    return (
      <div className='app'>
        <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} nukeText={nukeText}/>
        <br></br>
        <Overview weatherData={weatherData}/>
        <br></br>
        <Locations savedLocations={savedLocations} handleDelete={handleDelete} submitLocation={submitLocation}/>
      </div>
    )
  }
}

export default App;