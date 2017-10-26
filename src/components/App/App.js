import React, { Component } from 'react';
import './App.css';
import Banner from '../Banner/Banner'
import { Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultados: []
    }
  }

  ultimoprecio = (hist) => {
    return <h5>{'$ '+ hist[hist.length - 1].precio}</h5>
  }

  getResultados = () => {
    if (this.state.resultados.length > 0) {
      return (
        <div className="resultados">
          <ul>
          {this.state.resultados.map(r => {
            return (
              <li key={r._id}>
                <Link to={'/producto/' + r._id}>
                  <img src={r.imagen} alt={"Imagen de " + r.nombre}/>
                  <div className="datos">
                    <div className="texto">
                      <h3>{r.nombre}</h3>
                      <h4>{r.marca}</h4>
                    </div>
                    <div className="precio">
                      {this.ultimoprecio(r.historial)}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
          </ul>
        </div>
      )
    } else {
      console.log("vacio")
    }
  }

  onChangeInput = (e) => {
    let search = e.target.value;
    if (search != "") {
       fetch('https://server-price-history.herokuapp.com/productos/buscar/' + search)
      .then(res => res.json())
      .then(products => {
        this.setState({
          resultados: products
        })
      })
    } else {
      this.setState({
        resultados: []
      })
    }
  }

  render() {
    return (
      <div>
        <Banner dondeestoy="inicio"/>
        <div className="App">
          <h1 className="saludo">Conoce el historial de precios de las cosas que compraste</h1>
          <input type="input" placeholder="Ingresa el producto a buscar" onChange={this.onChangeInput}></input>
          {this.getResultados()}
        </div>
      </div>
    );
  }
}

export default App;
