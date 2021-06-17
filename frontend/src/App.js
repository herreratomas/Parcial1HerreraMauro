import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Peliculas from './components/Peliculas';
import Generos from './components/Generos';
import DetallePelicula from './components/DetallePelicula';
import Formulario from './components/Formulario';
import Home from './components/Home';



class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} ></Route>
          <Route exact path="/Home" component={Home} ></Route>
          <Route path="/Peliculas" component={Peliculas} ></Route>
          <Route path="/Generos" component={Generos} ></Route>
          <Route path="/DetallePelicula/:id" component={DetallePelicula} ></Route>
          <Route path="/Formulario/:id" component={Formulario} ></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;