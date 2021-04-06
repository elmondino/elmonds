import { useRef, useState } from "react";
import axios from "axios";
import useSWR from "swr";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState(props.weatherData);
  const inputTemp = useRef();
  const hasError = false;

  const getTemperature = async () => {
    const inputVal = inputTemp.current.value;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputVal}&appid=00d2df6aa95aa491a745340f0b802ad1`
    );
    console.log(response);
    if (response && response.status === 200) {
      setWeatherData(response.data);
    }
    if (response && response.status !== 200) {
      hasError = true;
    }
  };

  if (hasError) {
    return <p>Unable to find that city... please try another</p>;
  }

  return (
    <>
      <h1>Weather in {weatherData.name}</h1>
      <p>
        Current temperature in {weatherData.name} is {weatherData.main.temp}° Celsius{" "}
      </p>
      <input type='text' ref={inputTemp} />
      <button onClick={getTemperature}>Find temperature</button>
    </>
  );
}

export async function getStaticProps(context) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=00d2df6aa95aa491a745340f0b802ad1`
  );

  return {
    props: {
      weatherData: response.data,
    },
  };
}
