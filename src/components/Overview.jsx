import React from 'react';

const Overview = ({weatherData}) => {

  if (Object.keys(weatherData).length !== 0) {
    const image = weatherData.current.condition.icon;
    return (
      <div className='overview'>
        <div className='location'>
          {`LOCATION: ${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`}
        </div>
        <br></br>
        <div className='text'>
          {`CONDITION: ${weatherData.current.condition.text}  `}
          <img className='image' src={image}/>
        </div>
        <br></br>
        <div className='visibility'>
          {`VISIBILITY: ${weatherData.current.vis_miles}miles | ${weatherData.current.vis_km}km`}
        </div>
        <br></br>
        <div className='wind'>
          {`WIND: ${weatherData.current.wind_mph}mph | ${weatherData.current.wind_kph}kph ${weatherData.current.wind_dir}`}
        </div>
        <br></br>
        <div className='temp'>
          {`TEMPERATURE: ${weatherData.current.temp_f}°F | ${weatherData.current.temp_c}°C`}
        </div>
        <br></br>
        <div className='humidity'>
          {`HUMIDITY: ${weatherData.current.humidity}`}
        </div>
        <br></br>
        <div className='uv'>
          {`UV INDEX: ${weatherData.current.uv}`}
        </div>
        <br></br>
        <div className='time'>
          {`LOCAL TIME: ${weatherData.location.localtime}`}
        </div>
      </div>
    )
  } else {
    return (
      <div className='overview empty'>
        <img src='https://siachenstudios.com/wp-content/uploads/2022/09/Spirit-Of-The-Harvest-Moon.png.webp'/>
      </div>
    )
  }
}

export default Overview;