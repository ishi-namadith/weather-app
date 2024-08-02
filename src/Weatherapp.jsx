import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

export default function WeatherApp() {
    const [city, setCity] = useState("galle");
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState(null);

    const apiKey = "93201dedd99d61458ac3ea647920ff64";

    useEffect(() => {
        if (city !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data); 
                    setData(data);
                })
                .catch((err) => console.log(err));
        }
    }, [city]);

    const addCity = () => {
        setCity(inputValue);
        setInputValue("");
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex flex-col bg-custom-image bg-cover bg-center h-screen ">
            <div className="flex h-1/3 items-center justify-center bg-black/70 p-4 md:p-8 lg:p-12">
                <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <Input label="Enter a location" color="white" size="lg" value={inputValue} onChange={handleChange} className="w-full" />
                    <Button variant="outlined" color="white" ripple="light" size="md" onClick={addCity}>Search</Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row h-2/3 bg-black/70">
                <div className="flex flex-col border-2 w-full md:w-1/3 m-4 md:m-10 rounded-lg text-white">
                    {data && (
                        <>
                            <div className="flex flex-col items-center justify-center h-1/2 mt-12">
                                <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold">{data.name}</h1>
                                <h3>{new Date().toLocaleDateString()}</h3>
                            </div>
                            <div className="flex h-1/2 items-center justify-center pb-16">
                                <FontAwesomeIcon icon={faCloud} size="4x" md:size="5x" lg:size="7x" className="mr-10" />
                                <h1 className="text-3xl md:text-4xl lg:text-6xl ml-10">{Math.round(data.main.temp)}°C</h1>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col border-2 w-full md:w-2/3 m-4 md:m-10 rounded-lg text-white">
                {data && (
                    <div className="flex flex-col md:flex-row h-1/2">
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center ">
                            <h1 className="text-md mb-2">clouds</h1>
                            <h1 className="text-xl">{data.weather[0].description}</h1>
                        </div>
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
                            <h1 className="text-md mb-2">Humidity</h1>
                            <h1 className="text-xl">{data.main.humidity}%</h1>
                        </div>
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
                            <h1 className="text-md mb-2">Wind</h1>
                            <h1 className="text-xl">{data.wind.speed} km/h</h1>
                        </div>
                    </div>
                )}
                {data && (  
                    <div className="flex flex-col md:flex-row h-1/2">
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
                            <h1 className="text-md mb-2">Sunrise</h1>
                            <h1 className="text-xl">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</h1>
                        </div>
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
                            <h1 className="text-md mb-2">Sunset</h1>    
                            <h1 className="text-xl">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</h1>
                        </div>
                        <div className="flex flex-col w-full md:w-1/3 justify-center items-center">
                            <h1 className="text-md mb-2">Pressure</h1>
                            <h1 className="text-xl">{data.main.pressure} hPa</h1>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}
