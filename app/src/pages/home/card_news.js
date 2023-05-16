import React, { useEffect,  } from "react";
import { Link } from "react-router-dom";

//import axios from "axios";

import { Button, Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";

export default function CardNews() {
    //const [news, setNews] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            /*const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            /*axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
            .then((res) => {
                console.log(`${res.data.address.city}-${res.data.address.state}`);
            })
            .catch(err => {
                console.error(err);
            });*/
        });
    },[]);

    return(
        <Card className="text-start">
            <CardHeader>
                <h2>Notícias</h2>
            </CardHeader>
            <CardBody>
                <ListGroup className="card" flush>
                    <ListGroupItem>
                        <h5>Notícia</h5>
                        <p>Subtitulo sobre alguma noticia que contem resumo...</p>
                        <Link style={{'fontWeight':'600'}}>Ver Mais</Link>
                    </ListGroupItem>
                </ListGroup>
                <br/>
                <Button color="primary">
                    Mais Notícias...
                </Button>
            </CardBody>
        </Card>
    );
};