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
  const [isRainingText, setIsRainingText] = useState('Make It Rain');
  const [isSnowingText, setIsSnowingText] = useState('Make It Snow');
  const [snowColor, setSnowColor] = useState('white');
  const [snowText, setSnowText] = useState('Random Snow');
  const [nuke, setNuke] = useState(false);
  const [nukeText, setNukeText] = useState('Nuke Server');

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#00C569', '#00C59f', '#ff6600', '#ff3333', '#ffff00', '#FFC569', '#FFC500', '#A43E00'];
  const random_color = colors[Math.floor(Math.random() * colors.length)];


  const getLocations = () => {
    axios.get('http://127.0.0.1:3000/mvp')
    .then((data) => {
      setSavedLocations(data.data);
      console.log('data here', data);
      console.log('data here', data.data);
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
      getLocations()
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
      getLocations()
      console.log('Added location!')
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
      getLocations()
      console.log(`Deleted ${clicked}`)
    })
    .catch((err)=> {
      console.log(`Error deleting location`)
    })
  }

  useEffect(() => {
    submitLocation
  }, [])

  useEffect(() => {
    handleDelete
  }, [])

  const toggleRain = () => {
    setIsRaining(!isRaining);
    setIsRainingText(
      isRainingText === 'Make It Rain' ? 'Stop Rain' : 'Make It Rain'
    )
  }

  const toggleSnow = () => {
    setIsSnowing(!isSnowing);
    setIsSnowingText(
      isSnowingText === 'Make It Snow' ? 'Stop Snow' : 'Make It Snow'
    )
  }

  const changeSnow = () => {
    setSnowColor(random_color)
    setSnowText(
      snowText === 'Random Snow' ? 'Normal Snow' : 'Random Snow'
    )
  }

  const normalSnow = () => {
    setSnowColor('white');
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
          <ObliqueRain  dropletsAmount={1000}  amplitude={400}  />
          <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} normalSnow={normalSnow} nukeText={nukeText} isRainingText={isRainingText} isSnowingText={isSnowingText}/>
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
          <Snowfall snowflakeCount={1000} color={snowColor}/>
        <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} normalSnow={normalSnow} nukeText={nukeText} isRainingText={isRainingText} isSnowingText={isSnowingText}/>
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
        <img className='cat' src='https://media.tenor.com/Ms3zVqn7qcUAAAAC/nuke-press-the-button.gif'/>
      </div>
    )
  } else {
    return (
      <div className='app'>
        <LocationInput setLocation={setLocation} location={location} submitLocation={submitLocation} addLocation={addLocation} toggleRain={toggleRain} toggleSnow={toggleSnow} changeSnow={changeSnow} snowText={snowText} nukeServer={nukeServer} normalSnow={normalSnow} nukeText={nukeText} isRainingText={isRainingText} isSnowingText={isSnowingText}/>
        <br></br>
        <Overview weatherData={weatherData}/>
        <br></br>
        <Locations savedLocations={savedLocations} handleDelete={handleDelete} submitLocation={submitLocation}/>
      </div>
    )
  }
}

export default App;