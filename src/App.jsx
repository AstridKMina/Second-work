import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'




function App() {
  const [clouds, setClouds] = useState({})
  const [temperature, setTemperature] = useState(0)
  const [maxTemperature, setMaxTemperature] = useState(0)
  const [minTemperature, setMinTemperature] = useState(0)
  const [feelsLike, setFeelsLike] = useState(0)
  const [units, setUnits] = useState("ºC")

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=10f107e2ffef78bbf789efae5b3cf58f`)
        .then(res => {
          setClouds(res.data);
          setTemperature(res.data.main.temp)
          setMaxTemperature(res.data.main.temp_max)
          setMinTemperature(res.data.main.temp_min)
          setFeelsLike(res.data.main.feels_like)
        });

    }

    const error = () => {
      alert("We can't access to your location")
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  const convertTemp = () => {
    if (units == "ºC") {
      setTemperature((temperature * 1.8) + 32);
      setMaxTemperature((maxTemperature * 1.8) + 32);
      setMinTemperature((minTemperature * 1.8) + 32);
      setFeelsLike((feelsLike * 1.8) + 32);
      setUnits("ºF")

    } else if (units == "ºF") {
      setTemperature((temperature - 32) / 1.8);
      setMaxTemperature((maxTemperature - 32) / 1.8);
      setMinTemperature((minTemperature - 32) / 1.8);
      setFeelsLike((feelsLike - 32) / 1.8);
      setUnits("ºC");
    }
  }

  useEffect(() => {
    document.body.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/paisaje-primavera-dibujado-mano_23-2148822585.jpg?w=2000')";
    if (temperature >= 30 && units == "ºC") {
      document.body.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/paisaje-primavera-gradiente_23-2148445817.jpg?w=2000')";
    } else if (temperature <= 20 && units == "ºC") {
      document.body.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/fondo-selva-dibujos-animados_23-2148962077.jpg?w=2000')";
    } else if (clouds.weather?.main === "rain") {
      document.body.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/estanque-montanas-o-lago-dia-lluvioso-paisaje-natural-paisaje-picos-roca-campo-hierba-verde-superficie-agua-lluvia-caida-cielo-opaco-fondo-natural-pintoresco-ilustracion-vectorial-dibujos-animados_107791-11570.jpg?w=2000')";

    }
  })

  return (

    <div className="App">
      <h1>Weather app</h1>
      <h2 className='cityName'>{clouds?.name},{clouds.sys?.country}</h2>
      <div className='parts'>
        <div className="imInfo">
          <ul>
            <li><img className='myIcon' src={`http://openweathermap.org/img/wn/${clouds.weather?.[0].icon}@2x.png`} alt="" /></li>
            <li><h3>{clouds.weather?.[0].description}</h3></li>
            <li><h3 className='myTemp'>{temperature.toFixed()}{units}</h3></li>
          </ul>
        </div>
        <div className='plusInfo'>
          <div className='temp'>
            <div className='mTemp'>
              <h6><i className="fa-solid fa-temperature-arrow-up"></i></h6>
              <h3>Max. Temperature</h3>
              <h3>{maxTemperature.toFixed()}{units}</h3>
            </div>
            <div className='mTemp'>
              <h6><i className="fa-solid fa-temperature-arrow-down"></i></h6>
              <h3>Min. Temperature</h3>
              <h3>{minTemperature.toFixed()}{units}</h3>
            </div>
          </div>
          <div className='moreInfo'>
            <div className='more'>
              <h6><i className="fa-solid fa-wind"></i></h6>
              <h4>Wind Speed</h4>
              <h4>{clouds.wind?.speed} m/s</h4>
            </div>
            <div className='more'>
              <h6><i className="fa-solid fa-temperature-low"></i></h6>
              <h4>Feels like</h4>
              <h4>{feelsLike.toFixed()}{units}</h4>
            </div>
            <div className='more'>
              <h6><i className="fa-solid fa-water"></i></h6>
              <h4>Humidity</h4>
              <h4>{clouds.main?.humidity} %</h4>
            </div>
          </div>
        </div>
      </div>
      <button onClick={convertTemp}><strong>ºC/ºF</strong></button>
    </div >

  )
}

export default App
