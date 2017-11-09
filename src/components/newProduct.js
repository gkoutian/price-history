import React from 'react';
import './newProduct.css';
import config from '../config';

export default class newProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            marca: '',
            imagen: '',
            precio: '',
            lugar: ''
        }
    }

    createHandler = (property) => {
        return (e) => {
            let aux = {};
            aux[property] = e.target.value;
            this.setState (aux);
        }
    };

    create = () => {
        let d = new Date();
        let nowDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        let envio = {};
        envio.nombre = this.state.nombre;
        envio.marca = this.state.marca;
        envio.imagen = this.state.imagen;
        envio.historial = [{
            precio: this.state.precio,
            lugar: this.state.lugar,
            fecha: nowDate
        }]
        fetch(config.apiUrl + 'products', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(envio),
            method: 'POST'
        })
        .then(r => {
            if (r.status === 201) {
                alert('Registrado con exito')
                window.location.href = process.env.PUBLIC_URL + '/';
            } else {
                alert('No se pudo registrar')
            }})
    }

    render () {
        return (
            <div className="newProduct">
                <h2>Registrar nuevo producto</h2>
                <h5>Nombre</h5>
                <input type="text" onChange={this.createHandler('nombre')}  placeholder="Ingrese nombre"/><br/>
                <h5>Marca</h5>
                <input type="text" onChange={this.createHandler('marca')}  placeholder="Ingrese marca"/><br/>
                <h5>Link de imagen (opcional)</h5>
                <input type="text" onChange={this.createHandler('imagen')}  placeholder="Ingrese imagen"/><br/>
                <div className="product-data">
                    <div className="product-price">
                        <h5>Precio</h5>
                        <input type="number" onChange={this.createHandler('precio')} placeholder="Ingrese precio"/><br/>
                    </div>
                    <div className="product-place">
                        <h5>Lugar</h5>
                        <input type="text" onChange={this.createHandler('lugar')}  placeholder="Ingrese lugar"/><br/>
                    </div>
                </div>
                <button onClick={this.create} className="create__button">Crear</button><br/>
            </div>
        )
    }
}