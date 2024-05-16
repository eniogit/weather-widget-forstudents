'use client'

import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
type WeatherData = {
  current: {
    precipitation: number,
    cloud_cover: number,
    temperature_2m: number,
  },
  current_units: {
    temperature_2m: string,
    precipitation: string,
  },
  daily: {
    temperature_2m_min: [number],
    temperature_2m_max: [number],
  },
  daily_units: {
    precipitation: string,
    temperature_2m_min: string,
    temperature_2m_max: string,
  },
};

function findImage(weatherData: WeatherData) {
  if (weatherData.current.precipitation > 12) {
    return "rain.png";
  } else if (weatherData.current.cloud_cover > 20) {
    return "sunny.webp";
  } else {
    return "100.png";
  }
}

export default function WeatherWidget() {
  const [weatherData, setState] = useState<WeatherData | null>(null);

  if (!weatherData) {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.3275&longitude=19.8189&current=temperature_2m,precipitation,cloud_cover&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=1"
    ).then(async (data) => setState(await data.json()));
  }

  return (
    <div className="grid grid-cols-2 text-center border h-[80vh] min-h-fit w-fit px-48 mt-24 rounded-xl shadow-lg mx-auto">
      {weatherData ? (
        <>
          <h1 className="text-9xl col-span-2">
            Tirana {weatherData.current.temperature_2m}{" "}
            {weatherData.current_units.temperature_2m}
          </h1>
          <img
            src={findImage(weatherData)}
            alt="sunny"
            className="col-span-2 w-full h-96"
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-xl">
            Lowest temperatur: {weatherData.daily.temperature_2m_min[0]}{" "}
            {weatherData.daily_units.temperature_2m_min}
          </h1>
          <h1 className="text-xl">
            Max Temperature: {weatherData.daily.temperature_2m_max[0]}{" "}
            {weatherData.daily_units.temperature_2m_max}
          </h1>
          <h1 className="text-xl col-span-2">
            Precipitation: {weatherData.current.precipitation}{" "}
            {weatherData.current_units.precipitation}
          </h1>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
