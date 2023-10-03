import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { WeatherContainer } from "./components/WeatherContainer";
import SearchCity from "./components/SearchCity";
import Load from "./components/Load";

function App() {
  //state
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false)
  const apiKey = "34096a64a7ea523a536caaea9ebcc65b";
  //logic
  const cityWeatherData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
  };

  const citySearch = (city) => {
    const urlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    axios
      .get(urlLoc)
      .then(({ data }) => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        cityWeatherData(lat, lon);
      })
      .catch((err) => console.log(err));
  };

  const success = (posit) => {
    const lat = posit.coords.latitude;
    const lon = posit.coords.longitude;
    cityWeatherData(lat, lon);
  };

  //effect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    citySearch(city);
  }, [city]);

  useEffect(() => {
    setLoading(true)
    const timerId = setTimeout(()=> {
      setLoading(false)
    }, 2000)
    return () => {
      clearInterval(timerId)
    }
  }, [weather])
  
  
  return (
    <main className={`container d${weather?.weather[0].icon}`}>
      <SearchCity setCity={setCity} />
      { loading ? <Load/> :
      <WeatherContainer weather={weather} key={Math.random()} />
      }
    </main>
  );
}

export default App;
