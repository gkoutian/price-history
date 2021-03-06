import React from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import './search.css';

export default class Search extends React.Component {
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
                    <Link to={process.env.PUBLIC_URL + '/producto/' + r._id}>
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
        }
      }

    onChangeInput = (e) => {
        let search = e.target.value;
        if (search !== "") {
          if (window.innerWidth <= 415) {
            document.getElementById('welcome-text').style.display = "none"
          }
           fetch(config.apiUrl + 'products/buscar/' + search, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
                method: 'GET'
            })
          .then(res => res.json())
          .then(products => {
            this.setState({
              resultados: products
            })
          })
        } else {
          document.getElementById('welcome-text').style.display = "block"
          this.setState({
            resultados: []
          })
        }
    }

    render () {
        return (
            <div className="search">
                <h2 id="welcome-text">Si compraste algo, registralo aca y despues mira el historial de precios</h2>
                
                <input type="text" placeholder="Ingrese el producto a buscar" className="search__input" onChange={this.onChangeInput}/>
                {this.getResultados()}
                <button onClick={() => window.location = process.env.PUBLIC_URL + '/nuevo-producto'}>Si el producto no exite, crealo aca!</button>
            </div>
        )
    }
}