import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { Button, Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "reactstrap";

export default function CardNews() {
    //const [news, setNews] = useState('');

    useEffect(() => {
        /*axios.get(`https://servicodados.ibge.gov.br/api/v3/noticias/?busca=clima`)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
        axios.get(`https://www.google.com/search?q=teresina+piaui+clima`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });*/
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