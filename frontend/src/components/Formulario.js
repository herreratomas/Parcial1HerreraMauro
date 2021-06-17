import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import logo from '../assets/images/logo-DH.png'

class Formulario extends Component {

    constructor() {
        super();
        this.state = {
            id: 0,
            title: '',
            rating: 0.0,
            awards: '',
            genre_id: 0,
            length: 0,
            release_date: new Date(),
            generos: [],
            peliculaEncontrada: []
        };
    }
    componentDidMount() {
        this._isMounted = true;
        this.getGeneros()
        this.getpeliculaXIdServer()


    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getGeneros() {
        fetch('http://localhost:3001/genres')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ generos: responseJson });
            })

    }

    formatearDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate()+ 1),
            year = d.getFullYear();

        console.log(d)
        console.log(month)
        console.log(day)
        console.log(year)

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        var dFormated = [year, month, day].join('-');

        return dFormated;
    }

    getpeliculaXIdServer() {
        const parametroId = this.props.match.params.id;
        // eslint-disable-next-line
        if (parametroId != 0) {

            fetch('http://localhost:3001/movies/detail/' + parametroId)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ peliculaEncontrada: responseJson });
                    this.setState({
                        id: parametroId,
                        title: this.state.peliculaEncontrada.title,
                        rating: this.state.peliculaEncontrada.rating,
                        awards: this.state.peliculaEncontrada.awards,

                        genre_id: this.state.peliculaEncontrada.genre_id,
                        length: this.state.peliculaEncontrada.length,
                        release_date: this.formatearDate(this.state.peliculaEncontrada.release_date),
                    })
                    console.log(this.state.title)
                    console.log(this.state.release_date)
                })
        }
    }


    submitHandler = (e) => {
        const form = e.target;
        var url = "";
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }


        e.preventDefault();

        var msj = ''
        if (this.state.id !== 0) {
            url = "http://localhost:3001/movies/update/" + this.state.id
            msj = "Pelicula Actualizada"
        } else {
            url = "http://localhost:3001/movies/create/"
            msj = "Pelicula Cargada"
        }
        var datos = {
            // eslint-disable-next-line
            id: this.state.id != 0 ? this.state.id : 0,
            title: this.state.title,
            rating: this.state.rating,
            awards: this.state.awards,
            genre_id: this.state.genre_id,
            length: this.state.length,
            release_date: this.state.release_date
        }

        fetch(url, {
            method: 'post',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',


        }).then((response) => {
            if (response.status === 200) {
                alert(msj)
                window.location.href = "/Peliculas"
            }
        }).catch(e => console.log(e));


    };

    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    };





    render() {
        const { title, rating, awards, genre_id, release_date, length } = this.state;
        const generosEncontrados = this.state.generos.map((genero, i) => {
            return (
                <option value={genero.id} key={genero.name}>{genero.name}</option>

            )
        })

        return (
            <React.Fragment>
                <link rel='stylesheet' href='../assets/css/style.css' />
                <Image src={logo} className="img" width="400" height="200"/>
                <div className="center">
                    <h1 className="titulo">Agregar Película</h1>
                    <br />
                    <section className="formulario">
                        <Form onSubmit={this.submitHandler}>
                            <Form.Group controlId="title">
                                <Form.Label>Title: </Form.Label>
                                <br />
                                <Form.Control
                                    name="title"

                                    value={title}
                                    onChange={this.changeHandler}
                                    type="String"
                                    placeholder="Ingrese el titulo"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="rating">
                                <Form.Label>Rating: </Form.Label>
                                <br />
                                <Form.Control
                                    name="rating"

                                    value={rating}
                                    onChange={this.changeHandler}
                                    type="Number"
                                    placeholder="Ingrese el rating"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="awards">
                                <Form.Label>Awards: </Form.Label>
                                <br />
                                <Form.Control
                                    name="awards"

                                    value={awards}
                                    onChange={this.changeHandler}
                                    type="Number"
                                    placeholder="Ingrese los premios"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="release_date">
                                <Form.Label>Release Date: </Form.Label>
                                <br />
                                <Form.Control
                                    name="release_date"
                                    value={release_date}
                                    onChange={this.changeHandler}
                                    type="Date"
                                    //placeholder="Ingrese los premios"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="length">
                                <Form.Label>Length: </Form.Label>
                                <br />
                                <Form.Control
                                    name="length"
                                    value={length}
                                    onChange={this.changeHandler}
                                    type="Number"
                                    placeholder="Ingrese la duracion"
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="genre_id">
                                <Form.Label>Genero: </Form.Label>
                                <br />
                                <select name="genre_id" value={genre_id} onChange={this.changeHandler} required>
                                    <option value="" disabled defaultValue>- select genre - </option>
                                    {generosEncontrados}
                                </select>
                            </Form.Group>
                            <br />



                            <section>
                                <Button className="botonAgregar" type="submit">
                                    Agregar
                                </Button>
                                <br />
                                <br />
                                <Button className="botonVolver" href="/Peliculas" type="submit">
                                    Listado de Películas
                                </Button>
                            </section>


                        </Form>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Formulario;
