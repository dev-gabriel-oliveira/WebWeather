import React, { useEffect, useState } from "react";

import axios from "axios";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { Card, CardBody, CardHeader, Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { BsDropletHalf } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";
import { FaCloudRain, FaRegSun } from "react-icons/fa";
import './home.css';

import CardForecast from "./card_forecast";
import CardNews from "./card_news";

export default function Home() {
    const [ capital, setCapital ] = useState([]);
    const [ here, setHere ] = useState([]);

    // Track the Loading Promise
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        trackPromise(
            //Get Capital Data
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-15.7801&longitude=-47.9292&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=America%2FSao_Paulo`)
            .then((res) => {
                setCapital(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        )

        //Get Here
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            trackPromise(
                axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
                .then((res) => {
                    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=America%2FSao_Paulo`)
                    .then((r) => {
                        setHere([{address: res.data.address},{weather: r.data}]);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            )
        })

        // eslint-disable-next-line
    }, [1000])

    return(
        <Container className="p-5">
            <h1 style={{'fontWeight':'600'}} className="pt-5">
                Bem-vindo, ao Web-Weather!
            </h1>

            <div className="d-flex justify-content-evenly p-5">
                {promiseInProgress === true ? ( // Loading
                    <Card className="text-center">
                        <CardHeader>
                            <Spinner className="my-4 mx-3" color="primary"/>
                        </CardHeader>
                        <CardBody>
                            <Spinner className="my-5 mx-3" color="secondary"/>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="text-center">
                        <CardHeader>
                            <h5>Brasília BR-PI</h5>
                            <h1>{capital?.current_weather?.temperature.toFixed(0)} °C</h1>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <FaRegSun className="sun"/> {capital?.daily?.temperature_2m_max[0].toFixed(0)} °C
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <FaCloudRain className="rain"/> {capital?.daily?.temperature_2m_min[0].toFixed(0)} °C
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <SiTailwindcss className="wind"/> {capital?.current_weather?.windspeed.toFixed(0)} m/s
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <BsDropletHalf className="drop"/> {capital?.daily?.precipitation_probability_max[0]} %
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                )}

                {promiseInProgress === true ? ( // Loading
                    <Card className="text-center">
                        <CardHeader>
                            <Spinner className="my-4 mx-3" color="primary"/>
                        </CardHeader>
                        <CardBody>
                            <Spinner className="my-5 mx-3" color="secondary"/>
                        </CardBody>
                    </Card>
                ) : (
                    <Card className="text-center">
                        <CardHeader>
                            <h5>{here[0]?.address?.city} {here[0]?.address['ISO3166-2-lvl4']}</h5>
                            <h1>{here[1]?.weather?.current_weather?.temperature.toFixed(0)} °C</h1>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <FaRegSun className="sun"/> {here[1]?.weather?.daily?.temperature_2m_max[0].toFixed(0)} °C
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <FaCloudRain className="rain"/> {here[1]?.weather?.daily?.temperature_2m_min[0].toFixed(0)} °C
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <SiTailwindcss className="wind"/> {here[1]?.weather?.current_weather?.windspeed.toFixed(0)} m/s
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between align-items-center">
                                <BsDropletHalf className="drop"/> {here[1]?.weather?.daily?.precipitation_probability_max[0]} %
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                )}
                
                <CardNews/>
            </div>
            
            <div className="d-flex justify-content-center p-5">
                <CardForecast/>
            </div>
        </Container>
    );
};