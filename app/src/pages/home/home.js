import React, { useEffect, useState } from "react";

import axios from "axios";

import { Card, CardHeader, Container, ListGroup, ListGroupItem } from "reactstrap";
import './home.css';

import CardNews from "./card_news";

export default function Home() {
    const [ capital, setCapital ] = useState([]);
    const [ here, setHere ] = useState([]);

    useEffect(() => {
        //Get Capital Data
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-15.7801&longitude=-47.9292&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=America%2FSao_Paulo`)
        .then((res) => {
            setCapital(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

        //Get Here
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

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
            });
        });

        // eslint-disable-next-line
    }, [1000])

    return(
        <Container className="p-5">
            <h1 style={{'fontWeight':'600'}} className="pt-5">
                Bem-vindo, ao Web-Weather!
            </h1>

            <div className="d-flex justify-content-evenly p-5">
                <Card className="text-center">
                    <CardHeader>
                        <h5>Brasília BR-PI</h5>
                        <h1>{capital?.current_weather?.temperature}°C</h1>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem>▲ {capital?.daily?.temperature_2m_max[0]}°C</ListGroupItem>
                        <ListGroupItem>▼ {capital?.daily?.temperature_2m_min[0]}°C</ListGroupItem>
                        <ListGroupItem>〜 {capital?.current_weather?.windspeed}m/s</ListGroupItem>
                        <ListGroupItem>🌢 {capital?.daily?.precipitation_probability_max[0]}%</ListGroupItem>
                    </ListGroup>
                </Card>

                <Card className="text-center">
                    <CardHeader>
                        <h5>{here[0]?.address?.city} {here[0]?.address['ISO3166-2-lvl4']}</h5>
                        <h1>{here[1]?.weather?.current_weather?.temperature}°C</h1>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem>▲ {here[1]?.weather?.daily?.temperature_2m_max[0]}°C</ListGroupItem>
                        <ListGroupItem>▼ {here[1]?.weather?.daily?.temperature_2m_min[0]}°C</ListGroupItem>
                        <ListGroupItem>〜 {here[1]?.weather?.current_weather?.windspeed}m/s</ListGroupItem>
                        <ListGroupItem>🌢 {here[1]?.weather?.daily?.precipitation_probability_max[0]}%</ListGroupItem>
                    </ListGroup>
                </Card>

                <CardNews/>
            </div>
            
        </Container>
    );
};