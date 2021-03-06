import { useRef, useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Text,
  Heading,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Alert, AlertTitle } from "@chakra-ui/react";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState(props.weatherData);
  const [hasError, setHasError] = useState(props.hasError);
  const inputTemp = useRef();

  const getTemperature = async (evt) => {
    evt.preventDefault();
    const inputVal = inputTemp.current.value;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputVal}&appid=44799b9499457adda656ebf1c8c7cabd`
      );
      setHasError(false);
      setWeatherData(response.data);
      successToast();
    } catch (error) {
      setHasError(true);
    }
  };

  const successToast = useToast({
    title: "Weather has been found for your desired location!",
    status: "info",
    duration: 5000,
    isClosable: true,
    variant: "solid",
  });

  return (
    <Box>
      {hasError ? (
        <>
          <Heading as='h1' my={5} size='lg'>
            City not found
          </Heading>
          <Text my={4}>Unable to find that city, please try another...</Text>
        </>
      ) : (
        <>
          <Heading as='h1' my={5} size='lg'>
            Weather in {weatherData.name}
          </Heading>
          <Text my={4}>
            Current temperature in {weatherData.name} is {weatherData.main.temp}
            ° and it feels like {weatherData.main.feels_like}° celsius.
          </Text>
        </>
      )}
      <form onSubmit={getTemperature}>
        <FormControl id='city' isRequired my={4}>
          <FormLabel>City name</FormLabel>
          <Input
            type='text'
            ref={inputTemp}
            placeholder='Please insert a name for a city to find its temperature...'
          />
        </FormControl>
        {hasError && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>
              Sorry, we are unnable to find that city. Try another!
            </AlertTitle>
          </Alert>
        )}
        <FormControl my={4}>
          <Button colorScheme={"blue"} type='submit'>
            Find weather for your city
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export async function getStaticProps(context) {
  const returnProps = (weatherData = null, hasError = false) => {
    return {
      props: {
        weatherData,
        hasError,
      },
    };
  };

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=44799b9499457adda656ebf1c8c7cabd`
    );
    return returnProps(response.data, false);
  } catch (err) {
    return returnProps(null, true);
  }
}
