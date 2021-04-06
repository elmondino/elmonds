import {useRef, useState} from 'react';
import axios from 'axios';

export default function Weather(props) {
	const [weatherData, setWeatherData] = useState(props.weatherData);
	const [hasError, setHasError] = useState(props.hasError);
	const inputTemp = useRef();

	const getTemperature = async () => {
		const inputVal = inputTemp.current.value;

		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputVal}&appid=00d2df6aa95aa491a745340f0b802ad1`
			);
			setHasError(false);
			setWeatherData(response.data);
			console.log(response);
		} catch (err) {
			setHasError(true);
			console.log(err);
		}
	};

	return (
		<>
			{hasError ? (
				<p>Unable to find that city... please try another</p>
			) : (
				<>
					<h1>Weather in {weatherData.name}</h1>
					<p>
						Current temperature in {weatherData.name} is {weatherData.main.temp}
						° and it feels like {weatherData.main.feels_like}° celsius.
					</p>
				</>
			)}
			<input type='text' ref={inputTemp} />
			<button onClick={getTemperature}>Find temperature</button>
		</>
	);
}

export async function getStaticProps(context) {
	const returnProps = (weatherData = null, hasError = false) => {
		console.log(weatherData, hasError);
		return {
			props: {
				weatherData,
				hasError,
			},
		};
	};

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=00d2df6aa95aa491a745340f0b802ad1`
		);
		return returnProps(response.data, false);
	} catch (err) {
		return returnProps(null, true);
	}
}
