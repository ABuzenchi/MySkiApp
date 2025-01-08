import { useEffect, useState } from "react";
import classes from "./weather.module.css";
import sunny from "../../assets/sunny.png";
import rainy from "../../assets/rainy.png";
import snowy from "../../assets/snowy.png";
import cloudy from "../../assets/cloudy.png";
import { IoIosSearch } from "react-icons/io";

const Weather = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const api_key = "0b901684929992e24d14fa2cc85abd9b";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "Sinaia";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaulttData = await res.json();
      setData(defaulttData);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        console.log(searchData);
        setData(searchData);
        setLocation("");
      }
    }
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      search();
    }
  };

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
      <div className={classes.location}>
        {data.name}
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        ></input>
        <button onClick={search} className={classes.searchButton}>
          <IoIosSearch size={20} />
        </button>
      </div>
      {data.notFound?(<div className={classes.notFound}>Not Found😢</div>):(
        <>
      <div className={classes.weather}>
        <img src={weatherImage} alt="Sunny image" />
        <div className={classes.weathertype}>
          {data.weather ? data.weather[0].main : null}
        </div>
        <div className={classes.temp}>
          {data.main ? `${Math.floor(data.main.temp)}` : null}
        </div>
      </div>
      <div className={classes.weatherdate}>
        <p>{formattedDate}</p>
      </div>
      <div className={classes.weatherdata}>
        <div className={classes.humidity}>
          <div className={classes.dataname}>Humidity</div>
          <div className={classes.data}>
            {data.main ? data.main.humidity : null}%
          </div>
        </div>
        <div className={classes.wind}>
          <div className={classes.dataname}>Wind</div>
          <div className={classes.data}>
            {data.wind ? data.wind.speed : null} km/h
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
export default Weather;
