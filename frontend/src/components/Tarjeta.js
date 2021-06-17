import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';



class Tarjeta extends Component {

    render() {
          
        return (

            <React.Fragment>
                <Card >
                    <link rel='stylesheet' href='../assets/css/style.css' />
                    <div className="row no-gutters" >
                    {(this.props.lista === 'peliculas') ? <li><a href={`/DetallePelicula/${this.props.id}`}>{this.props.pelicula}</a></li> : <li>{this.props.name}</li>}
                        
                    </div>
                </Card >
            </React.Fragment >

        );

    }
}

export default Tarjeta;