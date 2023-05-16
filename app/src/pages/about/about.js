import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";

import './about.css';
import Mary from './Mary.jpg';

export default function About() {
    const navigate = useNavigate();
    const ver = null;

    // Scroll Up
    useEffect(() => {
        // Scroll to Top
        window.scrollTo(0, 0);
    }, [ver]);

    return(
        <div className="about">
            <Container className='title'>
                <img src={Mary} alt='' width={'200px'} style={{margin:'40px'}}/>

                <h1>Sobre</h1>

                <br/>

                <p>
                    "E disse-lhes: Vão pelo mundo todo e preguem o evangelho a todas as pessoas"
                    <br/>
                    Marcos 16:15
                </p>

                <hr/>

                <p>
                    Este site foi modelado com a intenção de oferecer mais uma opção de acesso 
                    às Sagradas Escrituras. A Palavra do Senhor veio para todos, e para todos ela deve ser levada.
                    O caminho da conversão não é fácil, ele consiste em uma batalha diária e constante. Através da Palavra 
                    o Senhor vem nos revelar o caminho para a Luz.
                </p>

                <br/>

                <p>
                    "Jesus disse: Eu sou a luz do mundo. Quem me segue, nunca andará em trevas, mas terá a luz da vida"
                    <br/>
                    João 8:12
                </p>

                <hr/>

                <p>
                    Esta aplicação Web foi desenvolvida por Gabriel Oliveira. Foi utilizada para a construção do site: 
                    React, Bootstrap e a Bible Api. Ajude a divulgar a Palavra compartilhando o presente site com seus 
                    amigos e familiares.
                </p>

                <br/>

                <p>
                    "E lhes disse: A colheita é grande, mas os trabalhadores são poucos. 
                    Portanto, peçam ao Senhor da colheita que mande trabalhadores para a sua colheita"
                    <br/>
                    Lucas 10:2
                </p>
            </Container>

            <hr/>

            <Container className='reading'>
                <h5>Vamos começar as leituras?</h5>
                <Button color="warning" onClick={() => navigate('/livros')}>Livros</Button>
            </Container>
        </div>
    );
};