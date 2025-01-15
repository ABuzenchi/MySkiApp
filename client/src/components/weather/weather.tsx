import { useEffect, useState } from "react";
import classes from "./weather.module.css";
import sunny from "../../assets/sunny.png";
import rainy from "../../assets/rainy.png";
import snowy from "../../assets/snowy.png";
import cloudy from "../../assets/cloudy.png";

interface WeatherProps {
  location: string;
}

const Weather = ({ location}:WeatherProps) => {
  const [data, setData] = useState<any>({});
  const api_key =  import.meta.env.VITE_WEATHER_API_KEY;
  console.log("API Key:", import.meta.env.VITE_WEATHER_API_KEY);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const weatherData = await res.json();
      setData(weatherData);
    };
    fetchWeather();
  }, [location]);

  const weatherImages: { [key: string]: string } = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : undefined;

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth}, ${month}`;

  return (
    <div className={classes.container}>
      <div className={classes.location}>{data.name || location}</div>
      {data.weather ? (
        <>
          <div className={classes.weather}>
            <img src={weatherImage} alt="Weather icon" />
            <div className={classes.weathertype}>
              {data.weather[0].main}
            </div>
            <div className={classes.temp}>
              {`${Math.floor(data.main.temp)}°C`}
            </div>
          </div>
          <div className={classes.weatherdate}>
            <p>{formattedDate}</p>
          </div>
          <div className={classes.weatherdata}>
            <div className={classes.humidity}>
              <div className={classes.dataname}>Humidity</div>
              <div className={classes.data}>
                {data.main.humidity}%
              </div>
            </div>
            <div className={classes.wind}>
              <div className={classes.dataname}>Wind</div>
              <div className={classes.data}>
                {data.wind.speed} km/h
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={classes.loading}>Loading...</div>
      )}
    </div>
  );
};

export default Weather;
