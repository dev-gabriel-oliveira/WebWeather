import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { Button, Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function CardForecast() {
    const [ forecast, setForecast ] = useState([]);

    // Track the Loading Promise
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        //Get Here's Forecast
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const date = new Date();

            let day = date.getDate();

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${date.toJSON().slice(0, 10)}-${day-20}`;
            console.log(currentDate); // "17-6-2022"

            trackPromise(
                axios.get(`https://api.open-meteo.com/v1/forecast?latitude=-5.10&longitude=-42.82&hourly=temperature_2m&start_date=2023-05-24&end_date=2023-05-28`)
                .then((res) => {
                    console.log(res);
                })
                .catch(err => {
                    console.error(err);
                })
            )
        })
    },[]);

    return(
        <ResponsiveContainer>
            <LineChart width={730} height={250} data={forecast}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};