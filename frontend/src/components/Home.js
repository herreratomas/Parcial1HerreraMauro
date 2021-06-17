import React from 'react';
import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-DH.png'

const Home = () =>{

        return (
            <React.Fragment>

                <Card>
                    <link rel='stylesheet' href='../assets/css/style.css' />

                   <Image src={logo} className="img" width="400" height="200" />
                    
                    <h1>Digital Movies</h1>
                    <p>Bienvenidos a Digital Movies</p>
                    <p><Link to="/Peliculas">Listado de Películas</Link></p>
                    <p><Link to="/Generos">Listado de Generos</Link></p>

                </Card>
            </React.Fragment>
        );

    }


export default Home;