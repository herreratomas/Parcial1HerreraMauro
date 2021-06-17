import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import logo from '../assets/images/logo-DH.png'


class DetallePelicula extends Component {

    constructor() {
        super();
        this.state = ({
            pelicula: [],
        });
    }
    componentDidMount() {
        this._isMounted = true;
        this.getpeliculaXIdServer();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    

    getpeliculaXIdServer() {
        const parametroId = this.props.match.params.id;

        fetch('http://localhost:3001/movies/detail/' + parametroId)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ pelicula: responseJson });
            })

    }

    delete = (e) => {
        console.log(e)
        const parametroId = e

        fetch('http://localhost:3001/movies/delete/' + parametroId, {
            method: 'post',
            mode: 'cors',
            cache: 'default',

        }).then((response) => {
            if (response.status === 200) {
                alert('Pelicula Borrada')
                window.location.href = "/Peliculas"
            }
        }).catch(e => console.log(e));

    }

    render() {

        const peliculaEncontrada = this.state.pelicula

        return (<React.Fragment>

            <Container>
            <link rel='stylesheet' href='../assets/css/style.css' />
                <Image src={logo} className="img" width="400" height="200"/>
               
                <h1>{peliculaEncontrada.title}</h1>

                <br />
                <p>Rating: {peliculaEncontrada.rating}</p>
                <p>Awards: {peliculaEncontrada.awards}</p>
                <p>Duracion: {peliculaEncontrada.length}</p>
                <p>Fecha de lanzamiento: {peliculaEncontrada.release_date}</p>
                <br />
                <section>
                    <Button className="botonModificar" href={`/Formulario/${peliculaEncontrada.id}`}>
                        Modificar
                    </Button>

                    <Button className="botonBorrar" onClick={this.delete.bind(this, peliculaEncontrada.id)}>
                        Borrar
                    </Button>

                    <Button className="botonVolver" href="/Peliculas">
                        Películas
                    </Button>
                </section>

            </Container>
        </React.Fragment>

        );

    }



}

export default DetallePelicula