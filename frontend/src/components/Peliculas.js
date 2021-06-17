import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Tarjeta from './Tarjeta';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import logo from '../assets/images/logo-DH.png'
import css from '../assets/css/style.css'

class Peliculas extends Component {

    _isMounted = false;

    constructor() {
        super();
        this.state = ({
            db: [],
        });

    }

    componentDidMount() {
        this._isMounted = true;
        this.getPeliculas();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    getPeliculas() {
        fetch('http://localhost:3001/Movies')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ db: responseJson });
            });

    }

    render() {

        const peliculas = this.state.db.map((pelicula, i) => {
            return (
                <Tarjeta key={pelicula.id} id={pelicula.id} pelicula={pelicula.title} lista='peliculas'></Tarjeta>
            )
        })
        return (<React.Fragment>
            <Container fluid="md" >
                <link rel='stylesheet' href={css} />
                <Image src={logo} className="img" width="400" height="200"/>
                <Col >
                    <link rel='stylesheet' href={css} />
                    <h1><b>Listado de peliculas</b></h1>
                    <br />
                    <Button className="botonModificar" href="/Formulario/0">
                        Agregar una pelicula
                    </Button>
                    <Button className="botonVolver" href="/">
                        Inicio
                    </Button>
                    <br />
                    <br />

                    <ul>
                        {peliculas}
                    </ul>
                </Col>
            </Container >
        </React.Fragment>
        );

    }
}

export default Peliculas;